import AbstractAction from "../actions/AbstractAction";
import AbstractReaction from "../reactions/AbstractReaction";
import AbstractService from "../services/AbstractService";

import actionObjects from "../actions";
import reactionObjects from "../reactions";
import serviceObjects from "../services";

export default class AboutController {
	/**
	 * List everything about the server
	 *
	 * @param ctx
	 * @param next
	 */
	static async services(ctx, next) {
				const allServices = [];
				var clientIP = ctx.request.ip;
				const currentTime = Math.floor(Date.now() / 1000)

				if (clientIP.substr(0, 7) == "::ffff:")
						clientIP = clientIP.substr(7)
		for (const serviceName of Object.keys(serviceObjects)) {
						const service: AbstractService = serviceObjects[serviceName];
						const serviceReactions = [];
						const serviceActions = [];
						for (const reactionName of Object.keys(reactionObjects)) {
								const reaction: AbstractReaction = reactionObjects[reactionName];
								if (reaction.getService().getName() === service.getName())
										serviceReactions.push({name: reaction.getName(), description: reaction.getDescription()});
						}
						for (const actionName of Object.keys(actionObjects)) {
								const action: AbstractAction = actionObjects[actionName];
								if (action.getService().getName() === service.getName())
										serviceActions.push({name: action.getName(), description: action.getDescription()});
						}
						allServices.push({name: service.getName(), actions: serviceActions, reactions: serviceReactions});
				}
		ctx.body = { client: { host: clientIP }, server: { current_time: currentTime, services: allServices } };
	}
}