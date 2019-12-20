import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import ClockService from "../../services/ClockService";

export interface ClockActionConfig {
	time?: string;
}

export interface ClockActionTemplate {}

class ClockAction extends AbstractAction {
	constructor() {
		super();
		this._service = ClockService;
		this._name = "ClockAction";
		this._litteralName = "Clock Action";
		this._description = "Everyday action";

		this._configFields = [
			{name: "time", variable: "time", type: "string", description: "Action hour (HH:MM)"}
		];

		this._templateFields = [];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get action config for this action
		const actionConfig: ClockActionConfig = action.config;

		const status = await ClockService.checkTime(actionConfig.time);
		if (!status) {
			return false;
		}

		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);
		const day = new Date().getDay();

		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;
			if (triggerDifferentiator['day'] === day)
				return false;
		}

		await this.addSuccessTriggerToHistory(
			action,
			{"day": day},
			JSON.stringify({"day": day})
		);

		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Fill templates fields that will be sent to reactions
		const content: ClockActionTemplate = {};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new ClockAction();