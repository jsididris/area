import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import IntraService from "../../services/IntraService";

export interface GPAChangeActionConfig {
	oauth?: string;
}

export interface GPAChangeActionTemplate {
	gpa: string;
}


class GPAChangeAction extends AbstractAction {
	constructor() {
		super();
		this._service = IntraService;
		this._name = "IntraGPAChangeAction";
		this._litteralName = "GPA Change";
		this._description = "Detect change in GPA";

		this._configFields = [
			{name: "Oauth token", variable: "oauth", type: "string", description: "You Intranet oauth token (auth-xxx)"}
		];

		this._templateFields = [
			{name: "GPA", variable: "gpa", description: "GPA"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
	// Get action config for this action
		const actionConfig: GPAChangeActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract last message according to action config
		let GPA = await IntraService.getGPA(actionConfig.oauth);

		// If there is not any message according to action config, there is no trigger
		if (!GPA)
			return false;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['gpa'] == GPA)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{"gpa": GPA},
			JSON.stringify({"gpa": GPA})
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
	// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const data = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: GPAChangeActionTemplate = {
			gpa: data.gpa,
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new GPAChangeAction();