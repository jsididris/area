import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import Office365Service from "../../services/Office365Service";
import { Service } from "../../models/Service";

export interface NewMailReceivedActionConfig {
	from?: string;
}

export interface NewMailReceivedActionTemplate {
	from: string;
	subject: string;
	link: string;
}

class NewMailReceivedAction extends AbstractAction {
	constructor() {
		super();
		this._service = Office365Service;
		this._name = "OutlookNewMailReceived";
		this._litteralName = "New mail received";
		this._description = "Fetch new mail received in Outlook";

		this._configFields = [
			{name: "Email address of the user that send the message", variable: "from", type: "string", description: "Trigger action when new Outlook mail is received from specified username"},
		];

		this._templateFields = [
			{name: "Author of the Message", variable: "from", description: "The user that send the mail"},
			{name: "Subject", variable: "subject", description: "Subject of the mail"},
			{name: "Link", variable: "link", description: "Mail URL"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
	// Get action config for this action
		const actionConfig: NewMailReceivedActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Get all Outlook messages
		const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});
		const mails = await Office365Service.getLastMails(service.token["access_token"]);

		// Extract last message according to action config
		let lastMail = null;
		for (let mail of mails.value.reverse()) {
			if (actionConfig.from && actionConfig.from === mail.from.emailAddress.address) {
				lastMail = mail;
			} else {
				lastMail = mail;
			}
		}

		// If there is not any message according to action config, there is no trigger
		if (!lastMail)
			return false;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['id'] === lastMail.id)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{id: lastMail.id},
			JSON.stringify(lastMail)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
	// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const mail = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewMailReceivedActionTemplate = {
			from: mail.from.emailAddress.address,
			subject: mail.subject,
			link: mail.webLink,
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewMailReceivedAction();