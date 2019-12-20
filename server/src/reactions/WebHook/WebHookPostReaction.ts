import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import WebhookService from "../../services/WebhookService";

class WebHookPostReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = WebhookService;
		this._name = "WebHookPostReaction";
		this._litteralName = "POST WebHook";
		this._description = "Call WebHook with POST method";

		this._configFields = [
			{name: "url", variable: "url", type: "string", description: "URL"},
			{name: "body", variable: "body", type: "string", description: "A stringified JSON of your body"}
		];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		const reactionConfig = reaction.config;
		const url = reactionConfig['url'];
		const body = reactionConfig['body'];

		await WebhookService.postWebHook(url, body);
	}
}

export default new WebHookPostReaction();