import fetch from "node-fetch";
import AbstractService from "./AbstractService";
import {Service} from "../models/Service";

class TrelloService extends AbstractService {
	private API_KEY = "4ab5077e3951175b49334593f37205d3";

	constructor() {
		super();
		this._name = "TrelloService";
		this._litteralName = "Trello";
		this._description = "Service Trello";
		this._logoUrl = "https://i.imgur.com/WqgWC61.png";
	}

	/**
	 * Get login URL
	 */
	async getLoginUrl(): Promise<string> {
		const redirectUri = encodeURIComponent(process.env.ORIGIN);
		return `https://trello.com/1/authorize?name=EpitechAREA&scope=read&response_type=token&key=${this.API_KEY}&return_url=${redirectUri}`;
	}

	/**
	 * Get auth token
	 *
	 * @param data
	 */
	async getAuthToken(data: object): Promise<object> {
		const token = data['token'];
		const userInfo = await fetch(`https://api.trello.com/1/members/me/?key=${this.API_KEY}&token=${token}`, {
			method: "GET",
			compress: true
		});
		const userJSON = await userInfo.json();

		return {
			access_token: token,
			username: userJSON.username,
		};
	}

	async getNotification(tokenArray: object): Promise<any> {
		const notifications = await fetch(`https://api.trello.com/1/members/${tokenArray['username']}/notifications?key=${this.API_KEY}&token=${tokenArray['access_token']}`, {
			method: "GET",
			compress: true
		});

		return await notifications.json();
	}

	async getBoards(tokenArray: object): Promise<any> {
		const boards = await fetch(`https://api.trello.com/1/members/${tokenArray['username']}/boards?key=${this.API_KEY}&token=${tokenArray['access_token']}`, {
			method: "GET",
			compress: true
		});

		return await boards.json();
	}

	async getCardsInBoard(tokenArray: object, boardId: string): Promise<any> {
		const cards = await fetch(`https://api.trello.com/1/boards/${boardId}?cards=all&key=${this.API_KEY}&token=${tokenArray['access_token']}`, {
			method: "GET",
			compress: true
		});

		const response = await cards.json();
		return response.cards;
	}
}

export default new TrelloService();
