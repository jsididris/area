import fetch from "node-fetch";
import AbstractService from "./AbstractService";

class SpotifyService extends AbstractService {
	private CLIENT_ID = "acd19349757df94";
		private CLIENT_SECRET = "41f0b677152570672180f5135b40c11776c802e6";

	constructor() {
		super();
		this._name = "ImgurService";
		this._litteralName = "Imgur";
		this._description = "Service d'Imgur";
		this._logoUrl = "https://i.imgur.com/kpLlF3Y.jpg";
	}

	/**
	 * Get the login URL
	 */
	async getLoginUrl(): Promise<string> {
		return `https://api.imgur.com/oauth2/authorize?client_id=${this.CLIENT_ID}&response_type=code`;
	}

	/**
	 * Authenticate using authorization_code & return tokens
	 *
	 * @param data
	 */
	async getAuthToken(data: object): Promise<object> {
				const response = await this.auth(data['code']);

				console.log(response);
		if (response['success'] === false) {
			return null;
				}

		return {
						username: response['account_username'],
						accountId: response['account_id'],
			access_token: response['access_token'],
						refresh_token: response['refresh_token']
		};
	}

	private async auth(code: string) {
				const { URLSearchParams } = require('url');

				const params = new URLSearchParams();
				params.append('grant_type', 'authorization_code');
				params.append('code', code);
				params.append('client_id', this.CLIENT_ID);
				params.append('client_secret', this.CLIENT_SECRET);

				const response = await fetch ('https://api.imgur.com/oauth2/token', {
						method: 'POST',
						body: params
				})

		return (await response.json());
	}
}

export default new SpotifyService();