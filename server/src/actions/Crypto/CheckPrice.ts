import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import CryptoService from "../../services/CryptoService";

export interface CheckPriceActionConfig {
	symbol?: string;
	price?: string;
}

export interface CheckPriceActionTemplate {
	symbol: string;
	price: string;
}

class CheckPriceAction extends AbstractAction {
	constructor() {
		super();
		this._service = CryptoService;
		this._name = "CryptoCheckPriceAction";
		this._litteralName = "Crypto price service";
		this._description = "Fetch token price in USD";

		this._configFields = [
			{name: "Symbol", variable: "symbol", type: "string", description: "Token Symbol (Ex: BTC)"},
			{name: "Price", variable: "price", type: "string", description: "Trigger price"},
		];

		this._templateFields = [
			{name: "Symbol", variable: "symbol", description: "Token Symbol (Ex: BTC)"},
			{name: "Price", variable: "price", description: "Current price"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		const actionConfig: CheckPriceActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);
		const data = await CryptoService.getPrice(actionConfig.symbol);

		// If there is not any message according to action config, there is no trigger
		if (!data)
			return false;

		const triggerPrice = parseFloat(actionConfig.price);
		const currentPrice = parseFloat(data.ticker.price);
		const state = (currentPrice > triggerPrice);

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['state'] === state)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{"state": state},
			JSON.stringify(data)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
	// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const data = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: CheckPriceActionTemplate = {
			symbol: data.ticker.base,
			price: data.ticker.price,
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new CheckPriceAction();