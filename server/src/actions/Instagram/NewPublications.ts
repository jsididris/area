import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import InstagramService from "../../services/InstagramService";
import { Service } from "../../models/Service";

export interface NewPublicationsActionConfig {}

export interface NewPublicationsActionTemplate {
	caption: string;
	link: string;
	image: string;
}

class NewPublicationsAction extends AbstractAction {
	constructor() {
		super();
		this._service = InstagramService;
		this._name = "InstagramNewPublications";
		this._litteralName = "New publication";
		this._description = "Fetch new publication in your instagram account";

		this._configFields = [];

		this._templateFields = [
			{name: "Caption", variable: "caption", description: "Caption of the publication"},
			{name: "Link", variable: "link", description: "Instagram URL"},
			{name: "Image", variable: "image", description: "Image URL"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Get all Outlook messages
		const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});
		const publications = await InstagramService.getPublications(service.token["access_token"]);

		// Extract last message according to action config
		let lastPublication = publications.data[0];

		// If there is not any message according to action config, there is no trigger
		if (!lastPublication)
			return false;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['id'] === lastPublication.id)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{id: lastPublication.id},
			JSON.stringify(lastPublication)
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
		const content: NewPublicationsActionTemplate = {
			caption: publication.caption.text,
			link: publication.link,
			image: publication.images.standard_resolution.url
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewPublicationsAction();