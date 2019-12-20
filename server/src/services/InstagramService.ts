import fetch from "node-fetch";
import AbstractService from "./AbstractService";

class InstagramService extends AbstractService {
	private CLIENT_ID = "20a6ef96c2bf4e87bc4bc6e52cea11a0";
	private CLIENT_SECRET = "59d81aa200ee4115a0eb7bac317e961e";

	constructor() {
		super();
		this._name = "InstagramService";
		this._litteralName = "Instagram";
		this._description = "Service d'Instagram";
		this._logoUrl = "https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300";
	}

	/**
	 * Get the login URL
	 */
	async getLoginUrl(): Promise<string> {
		return `https://api.instagram.com/oauth/authorize/?client_id=${this.CLIENT_ID}&redirect_uri=${process.env.ORIGIN}&response_type=code&scope=public_content`;
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
			username: response['user']['username'],
		};
	}

	private async auth(code: string) {
		const clientSecret = encodeURIComponent(this.CLIENT_SECRET);
		const redirectUri = process.env.ORIGIN;
		const body = `grant_type=authorization_code&redirect_uri=${redirectUri}&client_id=${this.CLIENT_ID}&code=${code}&client_secret=${clientSecret}`;
		const response = await fetch('https://api.instagram.com/oauth/access_token', {
			method: 'POST',
			body,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});

		return (await response.json());
	}

	async getPublications(token: object) {
		const response = await fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token['accessToken'], {
			method: 'GET'
		});

		return (await response.json());
	}

	async getPublication(token: object, id: string) {
		const response = await fetch('https://api.instagram.com/v1/media/' + id + '/?access_token=' + token['accessToken'], {
			method: 'GET'
		});

		return (await response.json());
	}

	async getPublicationComments(token: object, id: string) {
		const response = await fetch('https://api.instagram.com/v1/media/' + id + '/comments?access_token=' + token['accessToken'], {
			method: 'GET'
		});

		return (await response.json());
	}

	async getTagData(token: object, tag: string) {
		const response = await fetch('https://api.instagram.com/v1/tags/' + tag + '/?access_token=' + token['accessToken'], {
			method: 'GET'
		});

		return (await response.json());
	}
}

export default new InstagramService();