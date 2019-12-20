import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import TrelloService from "../../services/TrelloService";
import {Service} from "../../models/Service";

export interface NewNotificationActionConfig {
	type?: string,
}

export interface NewMessageReceivedActionTemplate {
	id: string;
	type: string;
	creator_name: string;
}

class NewNotificationAction extends AbstractAction {
	constructor() {
		super();
		this._service = TrelloService;
		this._name = "TrelloNewNotificationAction";
		this._litteralName = "New notification received";
		this._description = "Fetch new notification received into Trello";

		this._configFields = [
			{name: "The type of notification", variable: "notification", type: "string", description: "Trigger action when new Trello notification is received with specified type"}
		];

		this._templateFields = [
			{name: "ID", variable: "id", description: "The ID of the notification"},
			{name: "Type", variable: "type", description: "The type of the notification"},
			{name: "Creator name", variable: "creator_name", description: "The issuer of the notification"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get action config for this action
		const actionConfig: NewNotificationActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Get all trello notifications
		const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});

		const notifications = (await TrelloService.getNotification(service.token));

		// Extract last notifications according to action config
		let lastNotification = null;
		for (const notification of notifications.reverse()) {
			if (actionConfig.type && actionConfig.type === notification.type)
				lastNotification = notification;
			else
				lastNotification = notification;
		}

		// If there is not any message according to action config, there is no trigger
		if (!lastNotification)
			return false;

		// Check if the last notification extracted from Trello is same that last notification in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same notification are same, there is no trigger
			if (triggerDifferentiator['id'] === lastNotification.id)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{id: lastNotification.id},
			JSON.stringify(lastNotification)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract notification from trigger history
		const notification = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewMessageReceivedActionTemplate = {
			id: notification.id,
			type: notification.type,
			creator_name: notification.memberCreator.username
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewNotificationAction();