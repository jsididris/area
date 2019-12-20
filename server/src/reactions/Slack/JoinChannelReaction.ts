import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import SlackService from "../../services/SlackService";
import {Service} from "../../models/Service";

class JoinChannelReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = SlackService;
		this._name = "SlackJoinChannelReaction";
		this._litteralName = "Join Slack channel";
		this._description = "Join slack channel into Slack workspace";

		this._configFields = [
			{name: "Name", variable: "name", type: "string", description: "The channel name to join (support template)"},
		];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		// Extract from the reaction config the text to send and the chat ID to send message
		const reactionConfig = reaction.config;
		let name = reactionConfig['name'];
		name = this.evaluateTemplates(name, data);

		const reac = await Reaction.findOne({id: reaction.id}, {relations: ['action', 'action.area', 'action.area.user']});
		const user = reac.action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});

		await SlackService.joinChannel(service.token, name)
	}

}

export default new JoinChannelReaction();