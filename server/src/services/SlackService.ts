import fetch from "node-fetch";
import AbstractService from "./AbstractService";

class SlackService extends AbstractService {
	private CLIENT_ID = "98153723649.567116433409";
	private CLIENT_SECRET = "4cd5caa1ad0d5291db4fb745eebf0384";

	constructor() {
		super();
		this._name = "SlackService";
		this._litteralName = "Slack";
		this._description = "Service de Slack";
		this._logoUrl = "https://i.imgur.com/s05euDz.png";
	}

	/**
	 * Get the login URL
	 */
	async getLoginUrl(): Promise<string> {
		return `https://slack.com/oauth/authorize?client_id=${this.CLIENT_ID}&scope=read,post&redirect_uri=${process.env.ORIGIN}`;
	}

	/**
	 * Authenticate using authorization_code & return tokens
	 *
	 * @param data
	 */
	async getAuthToken(data: object): Promise<object> {
		const response = await this.auth(data['code']);
		if (response['error_type']) {
			return null;
		}

		return {
			access_token: response['access_token'],
			username: response['team_name'],
		};
	}

	private async auth(code: string) {
		const redirectUri = process.env.ORIGIN;
		const body = `redirect_uri=${redirectUri}&client_id=${this.CLIENT_ID}&code=${code}&client_secret=${this.CLIENT_SECRET}`;
		const response = await fetch('https://slack.com/api/oauth.access', {
			method: 'POST',
			body,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});

		return (await response.json());
	}

	async sendMessage(tokenArray: object, channel: string, text: string) {
		const response = await fetch("https://slack.com/api/chat.postMessage?token=" + tokenArray['access_token'], {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			"body": `channel=${channel}&text=${text}`
		});

		return (await response.json());
	}

	async createChannel(tokenArray: object, name: string) {
		const response = await fetch("https://slack.com/api/channels.create?token=" + tokenArray['access_token'], {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			"body": `name=${name}`
		});

		return (await response.json());
	}

	async joinChannel(tokenArray: object, name: string) {
		const response = await fetch("https://slack.com/api/channels.join?token=" + tokenArray['access_token'], {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			"body": `name=${name}`
		});

		return (await response.json());
	}

	async setUserPresence(tokenArray: object, presence: string) {
		const response = await fetch("https://slack.com/api/users.setPresence?token=" + tokenArray['access_token'], {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			"body": `presence=${presence}`
		});

		return (await response.json());
	}

	async addReminder(tokenArray: object, text: string, time: string) {
		const response = await fetch("https://slack.com/api/reminders.add?token=" + tokenArray['access_token'], {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			"body": `text=${text}&time=${time}`
		});

		return (await response.json());
	}

	async getConversationsList(tokenArray: object) {
		const response = await fetch("https://slack.com/api/conversations.list?token=" + tokenArray['access_token'], {
			method: "GET"
		});

		return (await response.json());
	}

	async getUsersList(tokenArray: object) {
		const response = await fetch("https://slack.com/api/users.list?token=" + tokenArray['access_token'], {
			method: "GET"
		});

		return (await response.json());
	}
}

export default new SlackService();