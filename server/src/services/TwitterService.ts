import AbstractService from "./AbstractService";
import * as oauth from "oauth";

class TwitterService extends AbstractService {
	private CLIENT_ID = "LdHXIP32ZZYPmzgQZQzt8R3ZK";
		private CLIENT_SECRET = "mav6K8sgWocnXUfiIdepejsrXDGoqBCKbzZRhnLPamkR7V1wIF";
		private REQUEST_TOKEN = "";
		private REQUEST_TOKEN_SECRET = "";
		private ACCESS_TOKEN = "";
		private ACESS_SECRET = "";

	constructor() {
		super();
		this._name = "TwitterService";
		this._litteralName = "Twitter";
		this._description = "Service de Twitter";
		this._logoUrl = "https://i.imgur.com/M8drPfO.png";
		}

	/**
	 * Get the login URL
	 */

		async getLoginUrl(): Promise<string> {
				const response = await new Promise((resolve, reject) => {
					const consumer = new oauth.OAuth(
							'https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token',
							this.CLIENT_ID, this.CLIENT_SECRET, "1.0A", process.env.ORIGIN, "HMAC-SHA1");
					consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
							if (error) {
								reject(error);
								return null;
							} else {
								const oauthData = { token : oauthToken,
												secret: oauthTokenSecret,
												redirect: "https://twitter.com/oauth/authorize?oauth_token=" + oauthToken };
								return resolve(oauthData);
							}
						  });
				});
				this.REQUEST_TOKEN = response["token"];
				this.REQUEST_TOKEN_SECRET = response["secret"];
				return response["redirect"];
			  }

	/**
	 * Authenticate using authorization_code & return tokens
	 *
	 * @param data
	 */
	async getAuthToken(data: object): Promise<object> {
				const response = await this.auth(data['oauth_verifier']);
				const userData = await this.getUserInfos(response);

				this.ACCESS_TOKEN = response['token'];
				this.ACESS_SECRET = response['secret'];
		if (response['error_type']) {
			return null;
				}

		return {
						access: response['token'],
						secret: response['secret'],
						username: userData['screen_name']
		};
	}

	private async auth(code: string) {

				 return new Promise((resolve, reject) => {
						const consumer = new oauth.OAuth(
								'https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token',
								this.CLIENT_ID, this.CLIENT_SECRET, "1.0A", process.env.ORIGIN, "HMAC-SHA1");
						consumer.getOAuthAccessToken(this.REQUEST_TOKEN, this.REQUEST_TOKEN_SECRET, code, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
								if (error) {
										reject(error);
										return null;
								} else {
										const accessTokens = {token: oauthAccessToken, secret: oauthAccessTokenSecret };
										resolve(accessTokens);
								}
						});
				});
		}

		private async getUserInfos(tokens: object): Promise<object> {
				const response = await new Promise<string>((resolve, reject) => {
						const consumer = new oauth.OAuth(
								'https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token',
								this.CLIENT_ID, this.CLIENT_SECRET, "1.0A", process.env.ORIGIN, "HMAC-SHA1");

						consumer.get('https://api.twitter.com/1.1/account/verify_credentials.json', tokens['token'], tokens['secret'],
								function (error, data, res) {
								if (error)
										reject(error);
								else
										resolve(data);
						});
				});
				return JSON.parse(response);
		}

		public async getLastTweet(user: string) : Promise<object>{
				const response = await new Promise<string>((resolve, reject) => {
						const consumer = new oauth.OAuth(
								'https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token',
								this.CLIENT_ID, this.CLIENT_SECRET, "1.0A", process.env.ORIGIN, "HMAC-SHA1");

						consumer.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${user}&count=1&include_rts=false`, this.ACCESS_TOKEN, this.ACESS_SECRET,
								function (error, data, res) {
								if (error)
										reject(error);
								else
										resolve(data);
						});
				});
				return JSON.parse(response);
		}

		public async likeTweet(tweetId: string): Promise<object> {
				const response = await new Promise<string>((resolve, reject) => {
						const consumer = new oauth.OAuth(
								'https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token',
								this.CLIENT_ID, this.CLIENT_SECRET, "1.0A", process.env.ORIGIN, "HMAC-SHA1");

						const body = {
								id: tweetId
						}

						consumer.post('https://api.twitter.com/1.1/favorites/create.json', this.ACCESS_TOKEN, this.ACESS_SECRET, body, "application/json",
								function (error, data, res) {
								if (error)
										reject(error);
								else
										resolve(data);
						});
				});
				return JSON.parse(response);
		}

		public async postTweet(content: string): Promise<object> {
				const response = await new Promise<string>((resolve, reject) => {
						const consumer = new oauth.OAuth(
								'https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token',
								this.CLIENT_ID, this.CLIENT_SECRET, "1.0A", process.env.ORIGIN, "HMAC-SHA1");

						const body = {
								status: content
						}

						consumer.post('https://api.twitter.com/1.1/statuses/update.json', this.ACCESS_TOKEN, this.ACESS_SECRET, body, "application/json",
								function (error, data, res) {
								if (error)
										reject(error);
								else
										resolve(data);
						});
				});
				return JSON.parse(response);
		}

		public async retweet(tweetId: string): Promise<object> {
				const response = await new Promise<string>((resolve, reject) => {
						const consumer = new oauth.OAuth(
								'https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token',
								this.CLIENT_ID, this.CLIENT_SECRET, "1.0A", process.env.ORIGIN, "HMAC-SHA1");

						const body = {
								id: tweetId
						}

						consumer.post(`https://api.twitter.com/1.1/statuses/retweet/${tweetId}.json`, this.ACCESS_TOKEN, this.ACESS_SECRET, body, "application/json",
								function (error, data, res) {
								if (error)
										reject(error);
								else
										resolve(data);
						});
				});
				return JSON.parse(response);
		}
}

export default new TwitterService();