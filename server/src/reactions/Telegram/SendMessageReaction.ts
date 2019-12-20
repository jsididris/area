import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import TelegramService from "../../services/TelegramService";

class SendMessageReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = TelegramService;
		this._name = "TelegramSendMessageReaction";
		this._litteralName = "Send Telegram message";
		this._description = "Send message to Telegram";

		this._configFields = [
			{name: "Token (required)", variable: "token", type: "string", description: "Set the BOT token used to authenticate it for sending messages"},
			{name: "Chat ID", variable: "chat_id", type: "number", description: "The Telegram chat ID where send message"},
			{name: "Message", variable: "text_to_send", type: "string", description: "The message text (support template)"}
		];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		// Extract from the reaction config the text to send and the chat ID to send message
		const reactionConfig = reaction.config;
		const chatId = reactionConfig['chat_id'];
		let textToSend = reactionConfig['text_to_send'];

		if (!reactionConfig['token'])
			return;

		// Replace all templates variables into `textToSend` by her corresponding values received from action into `data`
		textToSend = this.evaluateTemplates(textToSend, data);

		// Send the message using Telegram service
		await TelegramService.sendMessage(chatId, textToSend, reactionConfig['token']);
	}

}

export default new SendMessageReaction();