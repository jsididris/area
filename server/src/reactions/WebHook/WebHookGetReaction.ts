import AbstractReaction from "../AbstractReaction";
import {Reaction} from "../../models/Reaction";
import WebhookService from "../../services/WebhookService";

class WebHookGetReaction extends AbstractReaction {
	constructor() {
		super();
		this._service = WebhookService;
		this._name = "WebHookGetReaction";
		this._litteralName = "GET WebHook";
		this._description = "Call WebHook with GET method";

		this._configFields = [
			{name: "url", variable: "url", type: "string", description: "URL"},
		];
	}

	protected async runReaction(reaction: Reaction, data: any): Promise<void> {
		const reactionConfig = reaction.config;
		const url = reactionConfig['url'];

		await WebhookService.getWebHook(url);
	}
}

export default new WebHookGetReaction();