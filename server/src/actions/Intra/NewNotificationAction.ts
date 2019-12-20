import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import IntraService from "../../services/IntraService";

export interface NewNotificationActionConfig {
	oauth?: string;
}

export interface NewNotificationActionTemplate {
	title: string;
	date: string;
}


class NewNotificationAction extends AbstractAction {
	constructor() {
		super();
		this._service = IntraService;
		this._name = "IntraNewNotificationAction";
		this._litteralName = "New notification";
		this._description = "Fetch new notification received in Epitech Intranet";

		this._configFields = [
			{name: "Oauth token", variable: "oauth", type: "string", description: "You Intranet oauth token (auth-xxx)"}
		];

		this._templateFields = [
			{name: "Title", variable: "title", description: "Title of the notification"},
			{name: "Date", variable: "data", description: "Date of the notification"}
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
	// Get action config for this action
		const actionConfig: NewNotificationActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract last message according to action config
		let lastNotifications = await IntraService.getNotifications(actionConfig.oauth);

		// If there is not any message according to action config, there is no trigger
		if (!lastNotifications)
			return false;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['id'] == lastNotifications.id)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{id: lastNotifications.id},
			JSON.stringify(lastNotifications)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
	// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const notification = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewNotificationActionTemplate = {
			title: notification.title,
			date: notification.date
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewNotificationAction();