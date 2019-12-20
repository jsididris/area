import {User} from "../models/User";
import * as bcrypt from "bcrypt";
import * as redis from "redis";
import * as HttpStatusCode from "http-status-codes";
import * as sendgrid from "@sendgrid/mail";

export default class AuthenticationController {
	/**
	 * Authenticate an user using his username & password
	 * @param ctx
	 * @param next
	 */
	static async login(ctx, next) {
		const username = ctx.request.body.username;
		const password = ctx.request.body.password;

		if (!username || !password) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = {errorName: "UserError", errorDescription: "Missing username or password."};
			return;
		}

		const user = await User.findOne({username});
		if (!user) {
			ctx.status = HttpStatusCode.UNAUTHORIZED;
			ctx.body = {errorName: "UserError", errorDescription: "User not found."};
			return;
		}

		if (user.validated === false) {
			ctx.status = HttpStatusCode.UNAUTHORIZED;
			ctx.body = {errorName: "UserError", errorDescription: "User not validated."};
			return;
		}

		if (bcrypt.compareSync(password, user.password) !== true) {
			ctx.status = HttpStatusCode.UNAUTHORIZED;
			ctx.body = {errorName: "UserError", errorDescription: "Invalid credentials."};
			return;
		}

		const token = AuthenticationController.generateToken(user);
		ctx.body = {token};
	}
	
	/**
	 * Logout a user and remove his token from redis
	 * @param ctx
	 * @param next
	 */
	static async logout(ctx, next) {
		const token = ctx.request['token'];

		if (!token) {
			ctx.status = HttpStatusCode.UNAUTHORIZED;
			ctx.body = {errorName: "UserNotLoggedIn", errorDescription: "You are not connected please login first."};
			return;
		}
		AuthenticationController.deleteToken(token);
		ctx.status = HttpStatusCode.OK;
		ctx.body = "";
	}

	/**
	 * Register new user
	 * @param ctx
	 * @param next
	 */
	static async register(ctx, next) {
		const username = ctx.request.body.username;
		const email = ctx.request.body.email;
		const password = ctx.request.body.password;

		if (!username || !email || !password) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = {errorName: "UserError", errorDescription: "Missing username / email or password."};
			return;
		}

		if (!AuthenticationController.isValidEmail(email) || username.length < 3 || email.length < 3 || password.length < 3) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = {errorName: "UserError", errorDescription: "Bad format for username / email or password."};
			return;
		}

		const userWithUsername = await User.findOne({username});
		const userWithEmail = await User.findOne({email});

		if (userWithUsername || userWithEmail) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = {errorName: "UserError", errorDescription: "Username or e-mail already taken."};
			return;
		}

		const user = new User();
		user.validated = false;
		user.username = username;
		user.email = email;
		user.password = bcrypt.hashSync(password, 10);
		await user.save();

		const mailToken = AuthenticationController.generateMailToken(user);
		sendgrid.setApiKey("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");
		const msg = {
			to: user.email,
			from: 'noreply@area.thedoux.fr',
			subject: 'Confirm your registration to AREA',
			html: '<h1>Welcome to AREA</h1><p>To end your registration, please confirm your account using this link: <a href="https://area.thedoux.fr/?confirmationToken='+mailToken+'">https://area.thedoux.fr/?confirmationToken='+mailToken+'</a></p>',
		};
		await sendgrid.send(msg);

		ctx.body = {error: false};
	}

	/**
	 * Validate new user
	 * @param ctx
	 * @param next
	 */
	static async validate(ctx, next) {
		const token = ctx.request.body.token;

		if (!token) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = {errorName: "UserError", errorDescription: "Missing token."};
			return;
		}

		const userId = await AuthenticationController.getUserIdByMailToken(token);
		if (!userId) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = {errorName: "UserError", errorDescription: "Bad token."};
			return;
		}

		const user = await User.findOne({id: userId});
		user.validated = true;
		await user.save();

		ctx.body = {user};
	}
	
	/**
	 * The function that let the user update their username, password and email
	 * @param ctx
	 * @param next
	 */
	static async update(ctx, next) {
		const email = ctx.request.body.email;
		const oldPassword = ctx.request.body.oldPassword;
		const newPassword = ctx.request.body.newPassword;

		const user = await User.findOne({id: ctx.user.id});

		if (!oldPassword || bcrypt.compareSync(oldPassword, user.password) !== true) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = {errorName: "InvalidParams", errorDescription: "Current password is wrong."};
			return;
		}

		if (newPassword) {
			if (newPassword.length < 3) {
				ctx.status = HttpStatusCode.BAD_REQUEST;
				ctx.body = {errorName: "InvalidParams", errorDescription: "Bad format for password."};
				return;
			}

			user.password = bcrypt.hashSync(newPassword, 10);
		}

		if (email && email !== user.email) {
			const userWithEmail = await User.findOne({email});

			if (!AuthenticationController.isValidEmail(email) || email.length < 3 || userWithEmail) {
				ctx.status = HttpStatusCode.BAD_REQUEST;
				ctx.body = {errorName: "InvalidParams", errorDescription: "Bad e-mail."};
				return;
			}

			user.email = email;
		}

		await user.save();
		ctx.user = user;
		ctx.body = { "email": user.email, "username": user.username };
	}

	/**
	 * Get current logged user
	 * @param ctx
	 * @param next
	 */
	static async me(ctx, next) {
		ctx.body = ctx.user;
	}

	/**
	 * Generate new token for specified user
	 *
	 * @param user
	 */
	private static generateToken(user: User) {
		const redisClient = redis.createClient(6379, "redis");
		const token = require('uuid/v4')();

		redisClient.set(`token:${token}`, user.id, 'EX', 60 * 60 * 24 * 31);
		return token;
	}

	/**
	 * Generate mail validation token
	 *
	 * @param user
	 */
	private static generateMailToken(user: User) {
		const redisClient = redis.createClient(6379, "redis");
		const token = require('uuid/v4')();

		redisClient.set(`mail_token:${token}`, user.id, 'EX', 60 * 60 * 24 * 31);
		return token;
	}

	/**
	 * Retrieve user id by mail-token using Redis store
	 *
	 * @param token
	 */
	private static async getUserIdByMailToken(token): Promise<any> {
		return new Promise((resolve, reject) => {
			const redisClient = redis.createClient(6379, "redis");
			redisClient.get(`mail_token:${token}`, (err, id) => {
				if (id) {
					return resolve(id);
				}

				return resolve(null);
			});
		});
	}

	/**
	 * Delete a token from redis
	 * @param token
	 */
	private static deleteToken(token: string) {
		const redisClient = redis.createClient(6379, "redis");

		redisClient.del(`token:${token}`, function(err, reply) {
			if (err) {
				console.log(err);
			}
		});
	}

	/**
	 * Validate e-mail address
	 *
	 * @param email
	 */
	private static isValidEmail(email: string) {
		return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
	}
}