import {EventEmitter} from "events";
import BackendEmittedEvent from "./enums/BackendEmittedEvent";
import {Area} from "./models/Area";
import {Action} from "./models/Action";
import {Reaction} from "./models/Reaction";

import AbstractAction from "./actions/AbstractAction";
import AbstractReaction from "./reactions/AbstractReaction";
import actionObjects from "./actions";
import reactionObjects from "./reactions";

import gatewayEmitter from "./gatewayEmitter";

export default class Runner {
	private readonly runnerEmitter: EventEmitter;
	private backendEmitter: EventEmitter;
	private actionIntervals: Array<NodeJS.Timeout> = [];

	/**
	 * Make the runner
	 */
	constructor() {
		this.runnerEmitter = new EventEmitter();
		this.backendEmitter = gatewayEmitter;
	}

	/**
	 * Start the runner that will make actions-trigger polling and reactions triggers registrations
	 */
	async start() {
		const actions = await Action.find({relations: ['area', 'reactions', 'area.user']});
		const reactions = await Reaction.find({relations: ['action', 'action.area', 'action.area.user']});

		// For each actions, make interval to `tick` to check trigger
		for (const action of actions) {
			this.actionIntervals[action.id] = setInterval(() => this.makeActionTick(action), action.area.fetch_time);
		}

		// For each reactions, add registration of events emitted on the `runnerEmitter`
		for (const reaction of reactions) {
			const reactionObject = this.getReactionObject(reaction.class_name);
			reactionObject.registerOnReaction(this.runnerEmitter, reaction);
		}

		// Listen back-end events to create / remove Area on runtime
		this.listenBackendEvents();
	}

	/**
	 * Listen on back-ends events related on Area adding / deleting
	 */
	private listenBackendEvents() {
		// When new area is created in backend
		this.backendEmitter.on(BackendEmittedEvent.AREA_CREATED.toString(), async (areaId) => {
			const area = await Area.findOne({id: areaId}, {relations: ['actions', 'actions.reactions', 'user']});
			const actions = await Action.find({where: {area}, relations: ['area', 'reactions', 'area.user']});

			// For each actions of new Area, make interval to `tick` to check trigger
			for (const action of actions) {
				this.actionIntervals[action.id] = setInterval(() => this.makeActionTick(action), area.fetch_time);
				const reactions = await Reaction.find({where: {action}, relations: ['action', 'action.area', 'action.area.user']});

				// For each reactions of each actions of new Area, add registration of events emitted on the `runnerEmitter`
				const alreadyRegisteredReaction = [];
				for (const reaction of action.reactions) {
					// For don't register a second time on reaction we check it in `alreadyRegisteredReaction` queue
					if (alreadyRegisteredReaction.includes(reaction.id))
						continue;

					const reactionObject = this.getReactionObject(reaction.class_name);
					reactionObject.registerOnReaction(this.runnerEmitter, reaction);
					alreadyRegisteredReaction.push(reaction.id);
				}
			}
		});

		// Before area is deleted in backend
		this.backendEmitter.on(BackendEmittedEvent.AREA_DELETED.toString(), async (area) => {
			// For each actions of deleted Area, we remove the interval to stop ticking
			for (const action of area.actions) {
				const actionInterval = this.actionIntervals[action.id];
				if (actionInterval) {
					clearInterval(actionInterval);
				}

				AbstractAction.unregisterAllReactions(this.runnerEmitter, action);
			}
		});
	}

	/**
	 * Check if action has new trigger and run-it
	 *
	 * @param action The related action
	 */
	private async makeActionTick(action: Action) {
		const actionObject = this.getActionObject(action.class_name);
		const hasTrigerred = await actionObject.hasTriggered(action);
		if (hasTrigerred) {
			console.log("New trigger fired for action", action.class_name, action.id);
			await actionObject.runAction(this.runnerEmitter, action);
		}
	}

	/**
	 * Get action object by model className
	 *
	 * @param className The class name of action
	 */
	private getActionObject(className: string): AbstractAction {
		return actionObjects[className];
	}

	/**
	 * Get reaction object by model className
	 *
	 * @param className The class name of reaction
	 */
	private getReactionObject(className: string): AbstractReaction {
		return reactionObjects[className];
	}
}