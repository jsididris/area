import fetch from "node-fetch";
import AbstractService from "./AbstractService";

class TelegramService extends AbstractService  {
	constructor() {
		super();
		this._name = "TelegramService";
		this._litteralName = "Telegram";
		this._description = "Service de Telegram";
		this._url = "https://telegram.org/";
		this._logoUrl = "https://telegram.org/img/t_logo.png";
	}

	 async sendMessage(chatId: string, text: string, token: string) {
		const uri = `https://api.telegram.org/${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
		let response = await fetch(uri, {method: 'GET'});

		if (response.status !== 200) {
			throw `Bad response status: ${response.status}`;
		}

		return (await response.json());
	}

	async getMessages(token: string) {
		const uri = `https://api.telegram.org/${token}/getUpdates`;
		let response = await fetch(uri, {method: 'GET'});

		if (response.status !== 200) {
			throw `Bad response status: ${response.status}`;
		}

		return (await response.json());
	}

	async getLoginUrl(): Promise<string> {
		return null;
	}

	async getAuthToken(query: object): Promise<object> {
		return {};
	}
}

export default new TelegramService();