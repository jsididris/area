import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import CustomProtocolService from "../../services/CustomProtocolService";

export interface NewPostActionConfig {
	console?: string;
}

export interface NewPostActionTemplate {
	title: string;
	date: string;
	url: string;
}

class NewPostAction extends AbstractAction {
	constructor() {
		super();
		this._service = CustomProtocolService;
		this._name = "CustomProtocolNewPost";
		this._litteralName = "Custom Protocol";
		this._description = "Fetch new post in Custom Protocol";

		this._configFields = [
			{name: "Console", variable: "console", type: "string", description: "Console"}
		];

		this._templateFields = [
			{name: "Title", variable: "title", description: "Title of the post"},
			{name: "Date", variable: "date", description: "Date of the post"},
			{name: "URL", variable: "url", description: "Url of the post"}
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		const actionConfig: NewPostActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);
		const posts = await CustomProtocolService.getPost(actionConfig.console);

		// Extract last message according to action config
		let lastPost = posts[0];

		// If there is not any message according to action config, there is no trigger
		if (!lastPost)
			return false;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['id'] === lastPost.id)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{id: lastPost.id},
			JSON.stringify(lastPost)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
	// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const publication = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewPostActionTemplate = {
			title: publication.title,
			date: publication.publi_date_fr,
			url: publication.url
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewPostAction();