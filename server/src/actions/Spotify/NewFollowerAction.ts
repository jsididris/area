import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import SpotifyService from "../../services/SpotifyService";
import { Service } from "../../models/Service";

export interface NewTweetActionConfig {
}

export interface NewTweetActionTemplate {
	count: string;
}

class NewTweetAction extends AbstractAction {
	constructor() {
		super();
		this._service = SpotifyService;
		this._name = "SpotifyNewFollowerAction";
		this._litteralName = "New follower";
		this._description = "Checks if you have a new follower";

		this._configFields = [];

		this._templateFields = [
			{name: "Follower count", variable: "count", description: "You new follower count"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get action config for this action
		const actionConfig: NewTweetActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

				// Get the follower count
				const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});
				const followerCount = (await SpotifyService.getUserInfos(service.token["access_token"])).followers.total;

		// Check if you have new follower
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			if (triggerDifferentiator['count'] >= followerCount)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{count: followerCount},
			followerCount
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract followerCount from trigger history
		const followerCount = lastTriggerHistory.fetched_content;

		// Fill templates fields that will be sent to reactions
		const content: NewTweetActionTemplate = {
			count: followerCount
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewTweetAction();