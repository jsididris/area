import fetch from "node-fetch";
import AbstractService from "./AbstractService";

class TwitchService extends AbstractService {
	private CLIENT_ID = "bjxgo0zdgor4stbr0qknss2kkr7sdk";
	private CLIENT_SECRET = "nmlqef0ln4xonj213gtlrmc1xafdb3";

	constructor() {
		super();
		this._name = "TwitchService";
		this._litteralName = "Twitch";
		this._description = "Service Twitch";
		this._logoUrl = "https://i.imgur.com/1iptSdI.png";
	}

	/**
	 * Get the login URL
	 */
	async getLoginUrl(): Promise<string> {
		const redirectUri = encodeURIComponent(process.env.ORIGIN);
		return `https://id.twitch.tv/oauth2/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=user:edit+user:read:email`
	}

	/**
	 * Authenticate using authorization_code & return tokens
	 *
	 * @param data
	 */
	async getAuthToken(data: object): Promise<object> {
		const response = await this.auth(data['code']);
		const user = await this.getUserInfo(response['access_token']);

		return {
			access_token: response['access_token'],
			username: user.data[0].display_name
		};
	}

	private async auth(code: string) {
		const redirectUri = encodeURIComponent(process.env.ORIGIN);
		const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`, {
			method: 'POST',
		});

		return (await response.json());
	}

	async getUserInfo(code: string) {
		const response = await fetch("https://api.twitch.tv/helix/users", {
			method: "GET",
			headers: {
				"Authorization": "Bearer " + code
			}
		});
		return (await response.json());
	}

	async getStreamsInfo(name: string) {
		const user = await fetch(`https://api.twitch.tv/helix/users?login=${name}`, {
			method: "GET",
			headers: {
				"Client-ID": this.CLIENT_ID
			}
		});
		const user_data = await user.json();
		const response = await fetch(`https://api.twitch.tv/helix/streams?user_id=${user_data.data[0].id}`, {
			method: "GET",
			headers: {
				"Client-ID": this.CLIENT_ID
			}
		});

		return (await response.json());
	}
}

export default new TwitchService();
