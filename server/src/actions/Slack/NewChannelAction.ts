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

class NewChannelAction extends AbstractAction {
	constructor() {
		super();
		this._service = SlackService;
		this._name = "SlackNewChannelAction";
		this._litteralName = "New channel created";
		this._description = "Fetch new channel creation into Slack workspace";

		this._configFields = [];

		this._templateFields = [
			{name: "ID", variable: "id", description: "The ID of the channel"},
			{name: "Name", variable: "name", description: "The name of the channel"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);
		const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});
		const channels = (await SlackService.getConversationsList(service.token))['channels'];

		if (!channels)
			return false;

		let channel = null;
		let lastChannel = null;
		let lastChannelTimestamp = 0;
		for (const channel of channels) {
			if (channel.created > lastChannelTimestamp) {
				lastChannel = channel;
				lastChannelTimestamp = channel.created;
			}
		}

		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['created'] < lastChannelTimestamp)
				channel = lastChannel;
		} else {
			channel = lastChannel;
		}

		if (channel === null)
			return false;

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{created: lastChannelTimestamp},
			JSON.stringify(channel)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const channel = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewChannelActionTemplate = {
			id: channel.id,
			name: channel.name,
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewChannelAction();