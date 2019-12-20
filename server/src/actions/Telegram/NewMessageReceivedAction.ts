import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import TelegramService from "../../services/TelegramService";

export interface NewMessageReceivedActionConfig {
	token?: string,
	from?: string;
	chat_type?: string;
}

export interface NewMessageReceivedActionTemplate {
	first_name: string;
	date: string;
	type: string;
	text: string;
}

class NewMessageReceivedAction extends AbstractAction {
	constructor() {
		super();
		this._service = TelegramService;
		this._name = "TelegramNewMessageReceivedAction";
		this._litteralName = "New message received";
		this._description = "Fetch new message received into Telegram";

		this._configFields = [
			{name: "Token (required)", variable: "token", type: "string", description: "Set the BOT token used to authenticate it for gathering messages"},
			{name: "User that send the message", variable: "from", type: "string", description: "Trigger action when new Telegram message is received from specified username"},
			{name: "The type of chat", variable: "chat_type", type: "string", description: "Trigger action when new Telegram message is received with into specified chat type"}
		];

		this._templateFields = [
			{name: "Author of the Message", variable: "first_name", description: "The user that posted the message"},
			{name: "Date of the message", variable: "date", description: "The date when the message was posted"},
			{name: "Type", variable: "type", description: "The chat type of the message"},
			{name: "Texte", variable: "text", description: "The text message"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get action config for this action
		const actionConfig: NewMessageReceivedActionConfig = action.config;
		if (!actionConfig.token)
			return false;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Get all telegram messages
		const messages = (await TelegramService.getMessages(actionConfig.token))['result'];

		// Extract last message according to action config
		let lastMessage = null;
		for (let message of messages) {
			message = message.message;
			if (actionConfig.from && actionConfig.from === message.from.first_name)
				lastMessage = message;
			else if (actionConfig.chat_type && actionConfig.chat_type === message.chat.type)
				lastMessage = message;
			else
				lastMessage = message;
		}

		// If there is not any message according to action config, there is no trigger
		if (!lastMessage)
			return false;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['message_id'] === lastMessage.message_id)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{message_id: lastMessage.message_id},
			JSON.stringify(lastMessage)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const message = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewMessageReceivedActionTemplate = {
			first_name: message.from.first_name,
			date: message.date,
			type: message.chat.type,
			text: message.text
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewMessageReceivedAction();