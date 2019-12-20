import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import Office365Service from "../../services/Office365Service";
import { Service } from "../../models/Service";

export interface NewEventActionConfig {
}

export interface NewEventActionTemplate {
	date_start: string;
	subject: string;
	link: string;
}

class NewEventAction extends AbstractAction {
	constructor() {
		super();
		this._service = Office365Service;
		this._name = "OutlookNewEventAction";
		this._litteralName = "New event created";
		this._description = "Fetch new event received in Outlook";

		this._configFields = [];

		this._templateFields = [
			{name: "Start", variable: "date_start", description: "Start of the event"},
			{name: "Subject", variable: "subject", description: "Subject of the mail"},
			{name: "Link", variable: "link", description: "Event URL"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
	// Get action config for this action
		const actionConfig: NewEventActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Get all Outlook messages
		const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});
		const events = await Office365Service.getLastEvents(service.token["access_token"]);

		// Extract last message according to action config
		let lastEvent = events.value[0];

		// If there is not any message according to action config, there is no trigger
		if (!lastEvent)
			return false;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['id'] === lastEvent.id)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{id: lastEvent.id},
			JSON.stringify(lastEvent)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
	// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const event = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewEventActionTemplate = {
			date_start: event.start.dateTime,
			subject: event.subject,
			link: event.webLink,
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewEventAction();