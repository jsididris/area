import AbstractService from "./AbstractService";
import fetch from "node-fetch";

class CryptoService extends AbstractService  {
	constructor() {
		super();
		this._name = "CryptoService";
		this._litteralName = "Crypto";
		this._description = "Check for crypto prices";
		this._logoUrl = "https://i.imgur.com/m1xSmil.png";
	}

	async getLoginUrl(): Promise<string> {
		return null;
	}

	async getAuthToken(query: object): Promise<object> {
		return {};
	}

	async getPrice(symbol: string) {
		const resp = await fetch(`https://api.cryptonator.com/api/ticker/${symbol.toLocaleLowerCase()}-usd`);
		return await resp.json();
	}
}

export default new CryptoService();