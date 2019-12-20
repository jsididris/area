import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import SlackService from "../../services/SlackService";
import {Service} from "../../models/Service";

export interface NewChannelActionTemplate {
	id: string;
	name: string;
}

class UserJoinedAction extends AbstractAction {
	constructor() {
		super();
		this._service = SlackService;
		this._name = "SlackUserJoinedAction";
		this._litteralName = "New user joined workspace";
		this._description = "Fetch new user join action into Slack workspace";

		this._configFields = [];

		this._templateFields = [
			{name: "ID", variable: "id", description: "The ID of the new user"},
			{name: "Name", variable: "name", description: "The name of the new user"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);
		const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});
		const users = (await SlackService.getUsersList(service.token))['members'];

		if (!users)
			return false;

		let member = null;
		let lastUser = null;
		let lastUserTimestamp = 0;
		for (const user of users) {
			if (user.updated > lastUserTimestamp) {
				lastUser = user;
				lastUserTimestamp = user.updated;
			}
		}

		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['updated'] < lastUserTimestamp)
				member = lastUser;
		} else {
			member = lastUser;
		}

		if (member === null)
			return false;

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{created: lastUserTimestamp},
			JSON.stringify(member)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const member = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewChannelActionTemplate = {
			id: member.id,
			name: member.real_name,
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new UserJoinedAction();