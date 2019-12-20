import AbstractService from "./AbstractService";

class ClockService extends AbstractService  {
	constructor() {
		super();
		this._name = "ClockService";
		this._litteralName = "Clock";
		this._description = "Make an action everyday";
		this._logoUrl = "https://i.imgur.com/bUYbIHU.jpg";
	}

	async checkTime(time: string) {
		const now = new Date();
		const hour = now.getHours() + 1;
		const min = now.getMinutes();

		const timeArray = time.split(":");
		if (timeArray.length != 2) {
			return false;
		}
		const actionHour = parseInt(timeArray[0]);
		const actionMin = parseInt(timeArray[1]);
		return (actionHour == hour && actionMin == min);
	}

	async getLoginUrl(): Promise<string> {
		return null;
	}

	async getAuthToken(query: object): Promise<object> {
		return {};
	}
}

export default new ClockService();