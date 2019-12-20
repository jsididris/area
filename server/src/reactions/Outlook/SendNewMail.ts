import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import {Service} from "../../models/Service";
import Office365Service from "../../services/Office365Service";

class SendMailReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = Office365Service;
		this._name = "OutlookSendMail";
		this._litteralName = "Send Mail";
		this._description = "Send mail";

		this._configFields = [
			{name: "To", variable: "to", type: "string", description: "to"},
			{name: "Subject", variable: "subject", type: "string", description: "Subject of the message (support template)"},
			{name: "Message", variable: "text_to_send", type: "string", description: "The message text (support template)"}
		];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		// Extract from the reaction config the text to send and the chat ID to send message
		const reactionConfig = reaction.config;
		const to = reactionConfig['to'];
		let textToSend = reactionConfig['text_to_send'];
		let subject = reactionConfig["subject"];

		// Replace all templates variables into `textToSend` by her corresponding values received from action into `data`
		textToSend = this.evaluateTemplates(textToSend, data);
		subject = this.evaluateTemplates(subject, data);

		// Send the message using Telegram service
		const reac = await Reaction.findOne({id: reaction.id}, {relations: ['action', 'action.area', 'action.area.user']});
		const user = reac.action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});

		const body = {
			"message": {
				"subject": subject,
				"body": {
					"contentType": "Text",
					"content": textToSend
				},
				"toRecipients": [
					{
						"emailAddress": {
							"address": to
						}
					}
				]
			},
			"saveToSentItems": "false"
		};
		await Office365Service.sendMail(service.token["access_token"], JSON.stringify(body));
	}
}

export default new SendMailReaction();