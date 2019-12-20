import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import InstagramService from "../../services/InstagramService";
import { Service } from "../../models/Service";

export interface NewCommentActionConfig {
	id?: string;
}

export interface NewCommentActionTemplate {
	text: string;
	from: string;
}

class NewCommentAction extends AbstractAction {
	constructor() {
		super();
		this._service = InstagramService;
		this._name = "InstagramNewComment";
		this._litteralName = "New Comment";
		this._description = "Fetch new comment in your instagram publication";

		this._configFields = [
			{name: "ID", variable: "id", type: "string", description: "Publication ID"}
		];

		this._templateFields = [
			{name: "Text", variable: "text", description: "Text of the comment"},
			{name: "From", variable: "from", description: "Username"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		const actionConfig: NewCommentActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Get all Outlook messages
		const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});
		const comments = await InstagramService.getPublicationComments(service.token["access_token"], actionConfig.id);

		// Extract last message according to action config
		let lastComment = comments.data[0];

		// If there is not any message according to action config, there is no trigger
		if (!lastComment)
			return false;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['id'] === lastComment.id)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{id: lastComment.id},
			JSON.stringify(lastComment)
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
		const content: NewCommentActionTemplate = {
			text: publication.text,
			from: publication.from.username,
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewCommentAction();