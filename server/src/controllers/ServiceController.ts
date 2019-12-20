import * as HttpStatusCode from "http-status-codes";
import {Service} from "../models/Service";
import {Area} from "../models/Area";

import AbstractService from "../services/AbstractService";
import AbstractAction from "../actions/AbstractAction";
import AbstractReaction from "../reactions/AbstractReaction";

import serviceObjects from "../services";
import actionObjects from "../actions";
import reactionObjects from "../reactions";


export default class ServiceController {
	/**
	 * Request an URL to launch OAUTH2.0
	 *
	 * @param ctx
	 * @param next
	 */
	static async redirect(ctx, next) {
		const serviceName = ctx.query.serviceName;

		if (!serviceName || !Object.keys(serviceObjects).includes(serviceName)) {
			ctx.status = HttpStatusCode.NOT_FOUND;
			ctx.body = {errorName: "ServiceError", errorDescription: "Bad service specified."};
			return;
		}

		const service: AbstractService = serviceObjects[serviceName];
		ctx.body = {link: await service.getLoginUrl()};
	}

	/**
	 * Add new service after login URL redirect-back
	 *
	 * @param ctx
	 * @param next
	 */
	static async add(ctx, next) {
		const serviceName = ctx.request.body.serviceName;

		if (!serviceName || !Object.keys(serviceObjects).includes(serviceName)) {
			ctx.status = HttpStatusCode.NOT_FOUND;
			ctx.body = {errorName: "ServiceError", errorDescription: "Bad service specified."};
			return;
		}

		const serviceObject: AbstractService = serviceObjects[serviceName];
		const token = await serviceObject.getAuthToken(ctx.request.body.grantData);
		if (!token) {
			ctx.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
			ctx.body = {errorName: "ServiceError", errorDescription: "Unable to retrieve tokens from service."};
			return;
		}

		const service = new Service();
		service.name = ctx.request.body.name;
		service.class_name = serviceName;
		service.token = token;
		service.user = ctx.user;
		await service.save();

		ctx.body = service;
	}
	
	/**
	 * Return all services in a JSON
	 * @param ctx
	 * @param next
	 */
	static async getAll(ctx, next) {
		const services = await Service.find({ user: ctx.user });
		for (const service of services) {
			const serviceObject: AbstractService = serviceObjects[service.class_name];
			service["logo_url"] = serviceObject.getLogoUrl();
		}

		ctx.body = { "totalCount": services.length, "services": services };
	}

	/**
	 * Delete a service via his id
	 * @param ctx
	 * @param next
	 */
	static async delete(ctx, next) {
		const id = ctx.params.id;

		if (!id) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = { errorName: "InvalidId", errorDescription: "Id not found or does not exist."};
			return;
		}

		const service = await Service.findOne(id);
		if (!service) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = { errorName: "InvalidService", errorDescription: "You haven't subscribed to this service yet."};
			return;
		}

		let isUnderUsage = false;
		let usageName = null;
		const areas = await Area.find({relations: ['actions', 'actions.reactions', 'user']});
		for (const area of areas) {
			if (area.user.id !== ctx.user.id)
				continue;

			for (const action of area.actions) {
				const actionObject: AbstractAction = actionObjects[action.class_name];
				if (service.class_name === actionObject.getService().getName()) {
					isUnderUsage = true;
					usageName = area.name;
					break;
				}

				for (const reaction of action.reactions) {
					const reactionObject: AbstractReaction = reactionObjects[reaction.class_name];
					if (service.class_name === reactionObject.getService().getName()) {
						isUnderUsage = true;
						usageName = area.name;
						break;
					}
				}
			}
		}

		if (isUnderUsage) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = { errorName: "InvalidService", errorDescription: "You can't remove this service until current AREA called "+usageName+" use-it."};
			return;
		}

		await Service.remove(service);
		ctx.body = service;
	}

	static async get(ctx, next) {
		const id = ctx.params.id;

		if (!id) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = { errorName: "InvalidId", errorDescription: "Id not found or does not exist."};
			return;
		}

		const service = await Service.findOne(id);
		if (!service) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = { errorName: "InvalidService", errorDescription: "You haven't subscribed to this service yet."};
			return;
		}
		
		ctx.body = service;
	}
}