import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import SlackService from "../../services/SlackService";
import {Service} from "../../models/Service";

class SetPresenceReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = SlackService;
		this._name = "SlackSetPresenceReaction";
		this._litteralName = "Set Slack presence";
		this._description = "Set slack presence (away / active) into Slack workspace";

		this._configFields = [
			{name: "Presence", variable: "presence", type: "string", description: "The presence (active / away)"},
		];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		// Extract from the reaction config the text to send and the chat ID to send message
		const reactionConfig = reaction.config;
		const presence = reactionConfig['presence'];

		const reac = await Reaction.findOne({id: reaction.id}, {relations: ['action', 'action.area', 'action.area.user']});
		const user = reac.action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});

		await SlackService.setUserPresence(service.token, presence)
	}

}

export default new SetPresenceReaction();