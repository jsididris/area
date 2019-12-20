import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import NexmoService from "../../services/NexmoService";

class SendSmsReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = NexmoService;
		this._name = "NexmoSendSmsReaction";
		this._litteralName = "Send SMS";
		this._description = "Send SMS to phone";

		this._configFields = [
			{name: "Phone number", variable: "phone", type: "string", description: "The phone number to send SMS"},
			{name: "Message", variable: "text", type: "string", description: "The message text (support template)"}
		];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		// Extract from the reaction config the text to send and the chat ID to send message
		const reactionConfig = reaction.config;
		const phone = reactionConfig['phone'];

		let text = reactionConfig['text'];
		text = this.evaluateTemplates(text, data);

		// Send the message using Nexmo service
		await NexmoService.sendSms(phone, text);
	}

}

export default new SendSmsReaction();