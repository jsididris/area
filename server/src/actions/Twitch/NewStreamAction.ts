import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import TwitchService from "../../services/TwitchService";

export interface NewStreamActionConfig {
	name?: string;
}

export interface NewStreamActionTemplate {
	title: string;
	link: string;
}

class NewStreamAction extends AbstractAction {
	constructor() {
		super();
		this._service = TwitchService;
		this._name = "TwitchNewStream";
		this._litteralName = "New stream";
		this._description = "Trigger when user launch a stream";

		this._configFields = [
			{name: "Name", variable: "name", type: "string", description: "Twitch username"},
		];

		this._templateFields = [
			{name: "Title", variable: "title", description: "Title of the stream"},
			{name: "Link", variable: "link", description: "Link of the stream"}
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
	// Get action config for this action
		const actionConfig: NewStreamActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);
		const stream = await TwitchService.getStreamsInfo(actionConfig.name);

		// If there is not any message according to action config, there is no trigger
		if (!stream)
			return false;

		const status = stream.data.length > 0;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['status'] === status)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{status: status},
			JSON.stringify(stream)
		);

		return status;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
	// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const stream = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewStreamActionTemplate = {
			title: stream.data[0].title,
			link: `https://twitch.tv/${stream.data[0].user_name}`
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewStreamAction();