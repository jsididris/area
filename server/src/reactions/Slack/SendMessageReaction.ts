import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import SlackService from "../../services/SlackService";
import {Service} from "../../models/Service";

class SendMessageReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = SlackService;
		this._name = "SlackSendMessageReaction";
		this._litteralName = "Send Slack message";
		this._description = "Send message to Slack workspace";

		this._configFields = [
			{name: "Channel", variable: "channel", type: "string", description: "The Slack channel where send the message"},
			{name: "Text", variable: "text", type: "string", description: "The message text (support template)"}
		];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		// Extract from the reaction config the text to send and the chat ID to send message
		const reactionConfig = reaction.config;
		const channel = reactionConfig['channel'];
		let text = reactionConfig['text'];

		// Replace all templates variables into `textToSend` by her corresponding values received from action into `data`
		text = this.evaluateTemplates(text, data);

		const reac = await Reaction.findOne({id: reaction.id}, {relations: ['action', 'action.area', 'action.area.user']});
		const user = reac.action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});

		await SlackService.sendMessage(service.token, channel, text);
	}

}

export default new SendMessageReaction();