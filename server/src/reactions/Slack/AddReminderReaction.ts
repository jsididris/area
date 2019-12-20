import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import SlackService from "../../services/SlackService";
import {Service} from "../../models/Service";

class AddReminderReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = SlackService;
		this._name = "SlackAddReminderReaction";
		this._litteralName = "Add Slack reminder";
		this._description = "Add Slack reminder to workspace";

		this._configFields = [
			{name: "Text", variable: "text", type: "string", description: "The reminder text (support template)"},
			{name: "Time", variable: "time", type: "string", description: "The reminder time, it can be the Unix timestamp, the number of seconds until the reminder (if within 24 hours), or a natural language description (Ex. \"in 15 minutes,\" or \"every Thursday\")"},
		];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		const reactionConfig = reaction.config;

		let text = reactionConfig['text'];
		text = this.evaluateTemplates(text, data);
		const time = reactionConfig['time'];

		const reac = await Reaction.findOne({id: reaction.id}, {relations: ['action', 'action.area', 'action.area.user']});
		const user = reac.action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});

		await SlackService.addReminder(service.token, text, time);
	}

}

export default new AddReminderReaction();