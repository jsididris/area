import AbstractService from "./AbstractService";
import fetch from "node-fetch";

class EtherscanService extends AbstractService  {
	constructor() {
		super();
		this._name = "EtherscanService";
		this._litteralName = "Etherscan Service";
		this._description = "Etherscan Service";
		this._logoUrl = "https://i.imgur.com/LFdx9Wy.png";
	}

	async getRopstenTransactions(address: string) {
		const resp = await fetch(`http://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=1IMZUNQBI168VMU3WX9WA7WRVAJXR34FAW`);
		const json = await resp.json();
		return json.result[0];
	}

	async getMainnetTransactions(address: string) {
		const resp = await fetch(`http://api.etherscan.io/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=1IMZUNQBI168VMU3WX9WA7WRVAJXR34FAW`);
		const json = await resp.json();
		return json.result[0];
	}

	async getLoginUrl(): Promise<string> {
		return null;
	}

	async getAuthToken(query: object): Promise<object> {
		return {};
	}
}

export default new EtherscanService();