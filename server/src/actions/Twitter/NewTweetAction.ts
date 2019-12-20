import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import TwitterService from "../../services/TwitterService";

export interface NewTweetActionConfig {
		from?: string;
}

export interface NewTweetActionTemplate {
	content: string;
		date: string;
		id: string;
}

class NewTweetAction extends AbstractAction {
	constructor() {
		super();
		this._service = TwitterService;
		this._name = "TwitterNewTweetAction";
		this._litteralName = "New tweet posted";
		this._description = "Fetch new tweets posted by a user";

		this._configFields = [
			{name: "From (required)", variable: "from", type: "string", description: "The user whose new tweets will be tracked"}
		];

		this._templateFields = [
			{name: "Content of the tweet", variable: "content", description: "The content of the tweet"},
						{name: "Date of the tweet", variable: "date", description: "The date when the tweet was posted"},
						{name: "ID of the tweet", variable: "id", description: "The ID of the tweet"}
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get action config for this action
		const actionConfig: NewTweetActionConfig = action.config;
		if (!actionConfig.from)
			return false;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Get last tweet from user
				const lastTweet = (await TwitterService.getLastTweet(actionConfig.from))[0];

		// If there is no tweet according to action config, there is no trigger
		if (!lastTweet)
			return false;

		// Check if the last tweet extracted from Twitter is same that last tweet in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same tweets are same, there is no trigger
			if (triggerDifferentiator['tweet_id'] === lastTweet.id)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{tweet_id: lastTweet.id},
			JSON.stringify(lastTweet)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract tweet from trigger history
		const tweet = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewTweetActionTemplate = {
			content: tweet.text,
						date: tweet.created_at,
						id: tweet.id_str
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewTweetAction();