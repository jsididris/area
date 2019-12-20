import AbstractService from "./AbstractService";
import fetch from "node-fetch";

class IntraService extends AbstractService  {
	constructor() {
		super();
		this._name = "IntraService";
		this._litteralName = "Intranet Epitech";
		this._description = "Intranet Epitech service";
		this._logoUrl = "https://i.imgur.com/rvMtFyG.png";
	}

	async getNotifications(token: string) {
		const resp = await fetch(`https://intra.epitech.eu/${token}/user/notification/message?format=json`);
		const json = await resp.json();
		return json[0];
	}

	async getGPA(token: string) {
		const resp = await fetch(`https://intra.epitech.eu/${token}/user/?format=json`)
		const json = await resp.json();
		return json.gpa[0].gpa;
	}

	async getCredit(token: string) {
		const resp = await fetch(`https://intra.epitech.eu/${token}/user/?format=json`)
		const json = await resp.json();
		return json.credits;
	}

	async getLoginUrl(): Promise<string> {
		return null;
	}

	async getAuthToken(query: object): Promise<object> {
		return {};
	}
}

export default new IntraService();