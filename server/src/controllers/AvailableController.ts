import AbstractAction from "../actions/AbstractAction";
import AbstractReaction from "../reactions/AbstractReaction";
import AbstractService from "../services/AbstractService";

import actionObjects from "../actions";
import reactionObjects from "../reactions";
import serviceObjects from "../services";
import {Service} from "../models/Service";
import {User} from "../models/User";

export default class AvailableController {
	/**
	 * List all available actions
	 *
	 * @param ctx
	 * @param next
	 */
	static async actions(ctx, next) {
		const enabledServices = await AvailableController.getAvailableServiceClassNames(ctx.user);
		const availableActions = [];

		for (const actionName of Object.keys(actionObjects)) {
			const action: AbstractAction = actionObjects[actionName];

			// Skip all actions without enabled service
			if (!enabledServices.includes(action.getService().getName()))
				continue;

			availableActions.push({
				name: action.getName(),
				serviceName: action.getService().getName(),
				litteralName: action.getLitteralName(),
				description: action.getDescription(),
				configFields: action.getConfigFields(),
				templateFields: action.getTemplateFields()
			});
		}

		ctx.body = {totalCount: availableActions.length, actions: availableActions};
	}

	/**
	 * List all available reactions
	 *
	 * @param ctx
	 * @param next
	 */
	static async reactions(ctx, next) {
		const enabledServices = await AvailableController.getAvailableServiceClassNames(ctx.user);
		const availableReactions = [];

		for (const reactionName of Object.keys(reactionObjects)) {
			const reaction: AbstractReaction = reactionObjects[reactionName];

			// Skip all reactions without enabled service
			if (!enabledServices.includes(reaction.getService().getName()))
				continue;

			availableReactions.push({
				name: reaction.getName(),
				serviceName: reaction.getService().getName(),
				litteralName: reaction.getLitteralName(),
				description: reaction.getDescription(),
				configFields: reaction.getConfigFields()
			});
		}

		ctx.body = {totalCount: availableReactions.length, reactions: availableReactions};
	}

	/**
	 * List all available services
	 *
	 * @param ctx
	 * @param next
	 */
	static async services(ctx, next) {
		const availableServices = [];
		const alreadyAddedServices = await Service.find({where: {user: ctx.user}});
		const alreadyAddedServicesNames = Array.from(alreadyAddedServices, service => service.class_name);

		for (const serviceName of Object.keys(serviceObjects)) {
			if (alreadyAddedServicesNames.includes(serviceName))
				continue;

			const service: AbstractService = serviceObjects[serviceName];
			availableServices.push({
				name: service.getName(),
				litteralName: service.getLitteralName(),
				description: service.getDescription(),
				url: service.getUrl(),
				logoUrl: service.getLogoUrl()
			});
		}

		ctx.body = {totalCount: availableServices.length, services: availableServices};
	}

	/**
	 * Get all available service class names for user
	 *
	 * @param user
	 */
	private static async getAvailableServiceClassNames(user: User): Promise<Array<string>> {
		const services = await Service.find({ user });
		const serviceClassNames = [];

		for (const service of services) {
			serviceClassNames.push(service.class_name);
		}

		return serviceClassNames;
	}
}