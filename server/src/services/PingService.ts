const ping = require('ping');
import AbstractService from "./AbstractService";

class PingService extends AbstractService  {
	constructor() {
		super();
		this._name = "PingService";
		this._litteralName = "Ping";
		this._description = "Service de Ping";
		this._logoUrl = "https://i.imgur.com/7f3VRo7.jpg";
	}

	async sendPing(url: string) : Promise<boolean> {
		return new Promise((resolve) => {
			ping.sys.probe(url, (isAlive) => {
				resolve(isAlive);
			});
		});
	}

	async getLoginUrl(): Promise<string> {
		return null;
	}

	async getAuthToken(query: object): Promise<object> {
		return {};
	}
}

export default new PingService();