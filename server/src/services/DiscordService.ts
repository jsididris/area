import fetch from "node-fetch";
import AbstractService from "./AbstractService";

class DiscordService extends AbstractService {
	private CLIENT_ID = "552533528449908742";
	private CLIENT_SECRET = "_7Z6HBxKRvLNlTgPJR7dcUe6kTKwDCbv";

	constructor() {
		super();
		this._name = "DiscordService";
		this._litteralName = "Discord";
		this._description = "Service de Discord";
		this._logoUrl = "https://i.imgur.com/hxtbMJc.png";
	}

	/**
	 * Get the login URL
	 */
	async getLoginUrl(): Promise<string> {
		const scope = encodeURI("messages.read guilds identify connections");
		return `https://discordapp.com/api/oauth2/authorize?client_id=${this.CLIENT_ID}&scope=${scope}&redirect_uri=${process.env.ORIGIN}&response_type=code`;
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

		const userData = await this.getUserInfos(response['access_token']);

		return {
			access_token: response['access_token'],
			username: userData['username']
		};
	}

	private async auth(code: string) {
		const scope = encodeURI("messages.read guilds identify connections");
		const redirectUri = process.env.ORIGIN;
		const body = `grant_type=authorization_code&scope=${scope}&redirect_uri=${redirectUri}&client_id=${this.CLIENT_ID}&code=${code}&client_secret=${encodeURI(this.CLIENT_SECRET)}`;
		const response = await fetch('https://discordapp.com/api/oauth2/token', {
			method: 'POST',
			body,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});

		return (await response.json());
	}

	private async getUserInfos(token: string) {
		const response = await fetch('https://discordapp.com/api/users/@me', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		return (await response.json());
	}

	public async getUserGuilds(tokenArray: object) {
		const response = await fetch('https://discordapp.com/api/users/@me/guilds', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${tokenArray['access_token']}`
			}
		});

		return (await response.json());
	}
}

export default new DiscordService();