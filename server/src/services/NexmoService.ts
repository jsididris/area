import AbstractService from "./AbstractService";
import * as Nexmo from "nexmo";

class NexmoService extends AbstractService  {
	private API_KEY = "7fe7f496";
	private API_SECRET = "ffmaqQj0zgpuhHll";

	constructor() {
		super();
		this._name = "NexmoService";
		this._litteralName = "Nexmo";
		this._description = "Service d\'envoi de SMS";
		this._logoUrl = "https://i.imgur.com/uTldn1r.png";
	}

	async getLoginUrl(): Promise<string> {
		return null;
	}

	async getAuthToken(query: object): Promise<object> {
		return {};
	}

	async sendSms(phone: string, text: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const nexmo = new Nexmo({apiKey: this.API_KEY, apiSecret: this.API_SECRET});

			nexmo.message.sendSms("AREA", phone, text);
			return resolve();
		});
	}
}

export default new NexmoService();