import fetch from "node-fetch";
import AbstractService from "./AbstractService";
import jwt = require('jsonwebtoken');

class Office365Service extends AbstractService {
	private CLIENT_ID = "e8d0b834-0193-4ab3-a5e4-a590f5fc4f64";
	private CLIENT_SECRET = "vnLAFR53$prhyqKJH213_*:";

	constructor() {
		super();
		this._name = "Office365Service";
		this._litteralName = "Office365";
		this._description = "Service Office365";
		this._logoUrl = "https://i.imgur.com/DjNDzGB.png";
	}

	/**
	 * Get the login URL
	 */
	async getLoginUrl(): Promise<string> {
		const redirectUri = encodeURIComponent(process.env.ORIGIN);
		const scope = encodeURIComponent("openid User.Read Mail.Read Calendars.Read Mail.Send");
		return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?redirect_uri=${redirectUri}&scope=${scope}&response_type=code&client_id=${this.CLIENT_ID}`
	}

	/**
	 * Authenticate using authorization_code & return tokens
	 *
	 * @param data
	 */
	async getAuthToken(data: object): Promise<object> {
		const response = await this.auth(data['code']);
		const decoded = jwt.decode(response['access_token']);

		return {
			access_token: response['access_token'],
			username: decoded.unique_name,
		};
	}

	private async auth(code: string) {
		const clientSecret = encodeURIComponent(this.CLIENT_SECRET);
		const redirectUri = encodeURIComponent(process.env.ORIGIN);
		const body = `grant_type=authorization_code&redirect_uri=${redirectUri}&client_id=${this.CLIENT_ID}&code=${code}&client_secret=${clientSecret}`;
		const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
			method: 'POST',
			body,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});

		return (await response.json());
	}

	async getLastMails(code: string) {
		const response = await fetch("https://graph.microsoft.com/v1.0/me/messages", {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${code}`,
			}
		});

		return (await response.json());
	}

	async getLastEvents(code: string) {
		const response = await fetch("https://graph.microsoft.com/v1.0/me/events", {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${code}`,
			}
		});

		return (await response.json());
	}

	async sendMail(code: string, body: Object) {
		const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${code}`
			},
			"body": body
		});

		return (await response.json());
	}
}

export default new Office365Service();
