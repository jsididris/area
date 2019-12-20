import AbstractService from "./AbstractService";
import fetch from "node-fetch";

class WebhookService extends AbstractService  {
	constructor() {
		super();
		this._name = "WebhookService";
		this._litteralName = "Webhook";
		this._description = "Call URL with GET/POST";
		this._logoUrl = "https://i.imgur.com/WyDrxgW.jpg";
	}

	async getWebHook(url: string) {
		const resp = await fetch(url);
		return await resp.json();
	}

	async postWebHook(url: string, data: string) {
		const resp = await fetch(url, {
			"method": "GET",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": data
		});
		return await resp.json();
	}

	async getLoginUrl(): Promise<string> {
		return null;
	}

	async getAuthToken(query: object): Promise<object> {
		return {};
	}
}

export default new WebhookService();