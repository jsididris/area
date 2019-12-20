import AbstractService from "./AbstractService";
import fetch from "node-fetch";

class CustomProtocolService extends AbstractService  {
	constructor() {
		super();
		this._name = "CustomProtocolService";
		this._litteralName = "Custom Protocol";
		this._description = "Custom protocol service";
		this._logoUrl = "https://www.customprotocol.com/medias/Logos/v2/carr%C3%A9/Logo_Custom_Protocol_GBPSP2_carr%C3%A9.png";
	}

	async getLoginUrl(): Promise<string> {
		return null;
	}

	async getAuthToken(query: object): Promise<object> {
		return {};
	}

	async getPost(console: string) {
		const resp = await fetch("https://api.customprotocol.com/?data=posts&console=" + console);
		return await resp.json();
	}
}

export default new CustomProtocolService();