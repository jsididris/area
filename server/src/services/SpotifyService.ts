import fetch from "node-fetch";
import AbstractService from "./AbstractService";

class SpotifyService extends AbstractService {
	private CLIENT_ID = "42a73a1b95f54f288a029dd3ddd3f4c2";
		private CLIENT_SECRET = "acd9ff6ac6254e8aa21f17c238de5a9f";

	constructor() {
		super();
		this._name = "SpotifyService";
		this._litteralName = "Spotify";
		this._description = "Service de Spotify";
		this._logoUrl = "https://developer.spotify.com/assets/branding-guidelines/icon1@2x.png";
	}

	/**
	 * Get the login URL
	 */
	async getLoginUrl(): Promise<string> {
				const redirectUri = encodeURIComponent(process.env.ORIGIN);
				const scopes = encodeURIComponent("user-read-email user-read-private user-follow-modify playlist-modify-public");
		return `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;
	}

	/**
	 * Authenticate using authorization_code & return tokens
	 *
	 * @param data
	 */
	async getAuthToken(data: object): Promise<object> {
		const response = await this.auth(data['code']);
		const userInfos = await this.getUserInfos(response['access_token']);

		if (response['error_type']) {
			return null;
		}

		return {
			access_token: response['access_token'],
			username: userInfos['display_name'],
						scope: response['scope'],
						refresh_token: response['refresh_token']
		};
	}

	private async auth(code: string) {
				const { URLSearchParams } = require('url');

				const params = new URLSearchParams();
				params.append('grant_type', 'authorization_code');
				params.append('redirect_uri', process.env.ORIGIN);
				params.append('code', code);
				params.append('client_id', this.CLIENT_ID);
				params.append('client_secret', this.CLIENT_SECRET);

				const response = await fetch ('https://accounts.spotify.com/api/token', {
						method: 'POST',
						body: params
				});

		return (await response.json());
	}

	public async getUserInfos(token: string) {
		const response = await fetch('https://api.spotify.com/v1/me', {
						method: 'GET',
						headers: {
								'Authorization': `Bearer ${token}`
						}
				});

		return (await response.json());
	}

	public async addSongToPlaylist(songUri, playlistId, token) {
		var uris = [songUri];
				const response = await fetch (`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
						method: 'POST',
			body: JSON.stringify({ uris : uris}),
			headers: {
								'Authorization': `Bearer ${token}`
						}
				});

		return (await response.json());
	}
}

export default new SpotifyService();