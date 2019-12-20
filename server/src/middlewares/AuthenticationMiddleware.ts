import {User} from "../models/User";
import * as redis from "redis";
import * as HttpStatusCode from "http-status-codes";

export default class AuthenticationMiddleware {
	/**
	 * Deny access to guest users
	 * @param ctx
	 * @param next
	 */
	static async authenticated(ctx, next) {
		const token = ctx.request['token'];

		if (!token) {
			ctx.status = HttpStatusCode.UNAUTHORIZED;
			ctx.body = {errorName: "UserNotLoggedIn", errorDescription: "You are not connected please loggin first."};
			return;
		}

		const id = await AuthenticationMiddleware.getUserIdByToken(token);
		if (!id) {
			ctx.status = HttpStatusCode.FORBIDDEN;
			ctx.body = {errorName: "InvalidToken", errorDescription: "A token was provided but it is invalid."};
			return;
		}

		const user = await User.findOne({id});

		if (!user) {
			ctx.status = HttpStatusCode.FORBIDDEN;
			ctx.body = {errorName: "InvalidToken", errorDescription: "A token was provided but it is invalid."};
			return;
		}

		delete user.password;
		ctx.user = user;
		await next();
	}

	/**
	 * Retrieve user id by token using Redis store
	 *
	 * @param token
	 */
	private static async getUserIdByToken(token): Promise<any> {
		return new Promise((resolve, reject) => {
			const redisClient = redis.createClient(6379, "redis");
			redisClient.get(`token:${token}`, (err, id) => {
				if (id) {
					return resolve(id);
				}

				return resolve(null);
			});
		});
	}
}