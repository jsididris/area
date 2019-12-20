import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import IntraService from "../../services/IntraService";

export interface CreditChangeActionConfig {
	oauth?: string;
}

export interface CreditChangeActionTemplate {
	credit: string;
}


class CreditChangeAction extends AbstractAction {
	constructor() {
		super();
		this._service = IntraService;
		this._name = "IntraCreditChangeAction";
		this._litteralName = "Credit Change";
		this._description = "Detect change in Credit";

		this._configFields = [
			{name: "Oauth token", variable: "oauth", type: "string", description: "You Intranet oauth token (auth-xxx)"}
		];

		this._templateFields = [
			{name: "Credit", variable: "credit", description: "Number of credit"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
	// Get action config for this action
		const actionConfig: CreditChangeActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract last message according to action config
		let credit = await IntraService.getCredit(actionConfig.oauth);

		// If there is not any message according to action config, there is no trigger
		if (!credit)
			return false;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['credit'] == credit)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{"credit": credit},
			JSON.stringify({"credit": credit})
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
		const content: CreditChangeActionTemplate = {
			credit: data.credit,
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new CreditChangeAction();