import * as HttpStatusCode from "http-status-codes";
import {Area} from "../models/Area";
import {Action} from "../models/Action";
import actionObjects from "../actions";
import reactionsObjects from "../reactions";
import {Reaction} from "../models/Reaction";
import gatewayEmitter from "../gatewayEmitter";
import BackendEmittedEvent from "../enums/BackendEmittedEvent";
import AbstractAction from "../actions/AbstractAction";
import {Service} from "../models/Service";
import AbstractService from "../services/AbstractService";
import serviceObjects from "../services";
import {TriggerHistory} from "../models/TriggerHistory";



export default class AreaController {
	/**
	 * Add new AREA by providing his fetch time and an array
	 * of actions objects that containing the config of
	 * each actions and an array of associated reactions objects
	 * TODO: refactor it in more readable code (multiple sub-functions for action & reaction creation)
	 *
	 * @param ctx
	 * @param next
	 */
	static async add(ctx, next) {
		const fetchTime = ctx.request.body.fetch_time;
		const actions = ctx.request.body.actions;
		const name = ctx.request.body.name;

		if (!name) {
			ctx.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
			ctx.body = {errorName: "AreaError", errorDescription: "Missing name for AREA."};
			return;
		}

		if (!fetchTime || isNaN(fetchTime)) {
			ctx.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
			ctx.body = {errorName: "AreaError", errorDescription: "Bad fetch time specified."};
			return;
		}

		if (!actions) {
			ctx.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
			ctx.body = {errorName: "AreaError", errorDescription: "No actions specified."};
			return;
		}

		const area = new Area();
		area.fetch_time = fetchTime;
		area.name = name;
		area.user = ctx.user;
		await area.save();

		for (const rawAction of actions) {
			const className = rawAction.class_name;
			const config = rawAction.config;
			const reactions = rawAction.reactions;

			if (!className || !Object.keys(actionObjects).includes(className)) {
				ctx.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
				ctx.body = {errorName: "AreaError", errorDescription: "Bad action specified for AREA creation."};
				return;
			}

			if (!config) {
				ctx.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
				ctx.body = {errorName: "AreaError", errorDescription: "Missing action config for AREA creation."};
				return;
			}

			if (!reactions) {
				ctx.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
				ctx.body = {errorName: "AreaError", errorDescription: "No reactions specified."};
				return;
			}

			const action = new Action();
			action.class_name = className;
			action.config = config;
			action.area = area;
			await action.save();

			const actionObject: AbstractAction = actionObjects[action.class_name];
			await actionObject.hasTriggered(action);

			for (const rawReaction of reactions) {
				const className = rawReaction.class_name;
				const config = rawReaction.config;

				if (!className || !Object.keys(reactionsObjects).includes(className)) {
					ctx.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
					ctx.body = {errorName: "AreaError", errorDescription: "Bad reaction specified for AREA creation."};
					return;
				}

				if (!config) {
					ctx.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
					ctx.body = {errorName: "AreaError", errorDescription: "Missing reaction config for AREA creation."};
					return;
				}

				const reaction = new Reaction();
				reaction.class_name = className;
				reaction.config = config;
				reaction.action = action;
				await reaction.save();
			}
		}

		gatewayEmitter.emit(BackendEmittedEvent.AREA_CREATED.toString(), area.id);
		ctx.body = area;
	}

	/**
	 * Return all areas in a JSON
	 * @param ctx
	 * @param next
	 */
	static async getAll(ctx, next) {
		const areas = await Area.find({ user: ctx.user });
		ctx.body = { "totalCount": areas.length, "areas": areas };
	}

	/**
	 * Delete a AREA via his id
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

		const area = await Area.findOne({id}, {relations: ['actions', 'actions.reactions', 'actions.trigger_histories']});

		if (!area) {
			ctx.status = HttpStatusCode.BAD_REQUEST;
			ctx.body = { errorName: "InvalidArea", errorDescription: "Area not found."};
			return;
		}

		gatewayEmitter.emit(BackendEmittedEvent.AREA_DELETED.toString(), area);

		for (const action of area.actions) {
			for (const reaction of action.reactions) {
				await Reaction.remove(reaction);
			}

			for (const trigger_history of action.trigger_histories) {
				await TriggerHistory.remove(trigger_history);
			}

			await Action.remove(action);
		}

		await Area.remove(area);
		ctx.body = "";
	}
}