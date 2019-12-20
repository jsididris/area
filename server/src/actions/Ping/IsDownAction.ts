import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import PingService from "../../services/PingService";

export interface PingDownActionConfig {
	host?: string;
}

export interface PingDownActionTemplate {
	url: string;
	isAlive: string;
}

class PingDownAction extends AbstractAction {
	constructor() {
		super();
		this._service = PingService;
		this._name = "PingDownAction";
		this._litteralName = "Is URL down";
		this._description = "Check if website is down";

		this._configFields = [
			{name: "host", variable: "host", type: "string", description: "Website URL"}
		];

		this._templateFields = [
			{name: "URL", variable: "url", description: "URL of the website"},
			{name: "Status", variable: "isAlive", description: "Status of the website (true if alive, false if not)"}
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get action config for this action
		const actionConfig: PingDownActionConfig = action.config;

		const status = !(await PingService.sendPing(actionConfig.host));

		await this.addSuccessTriggerToHistory(
			action,
			{host: actionConfig.host},
			JSON.stringify({"host": actionConfig.host, "status": status})
		);

		//Ping URL
		return status;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const data = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: PingDownActionTemplate = {
			url: data.host,
			isAlive: data.status
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new PingDownAction();