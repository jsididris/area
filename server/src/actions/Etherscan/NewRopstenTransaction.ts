import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import EtherscanService from "../../services/EtherscanService";

export interface NewRopstenTransactionActionConfig {
	address?: string;
}

export interface NewRopstenTransactionActionTemplate {
	from: string;
	timestamp: string;
	value: any;
	token: string;
	confirmation: string;
	txhash: string;
}

class NewRopstenTransaction extends AbstractAction {
	constructor() {
		super();
		this._service = EtherscanService;
		this._name = "EtherscanNewRopstenTransaction";
		this._litteralName = "New Ropsten transaction";
		this._description = "Fetch new Ropsten transaction for ERC20 token";

		this._configFields = [
			{name: "ERC20 Address", variable: "address", type: "string", description: "ERC20 Address"},
		];

		this._templateFields = [
			{name: "Sender", variable: "from", description: "Address of the sender"},
			{name: "Timestamp", variable: "timestamp", description: "Timestamp of the transaction"},
			{name: "Value", variable: "value", description: "Value of the transaction"},
			{name: "Token", variable: "token", description: "Symbol of the token"},
			{name: "Confirmation", variable: "confirmation", description: "Number of confirmation"},
			{name: "Transaction hash", variable: "txhash", description: "Transaction hash"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
	// Get action config for this action
		const actionConfig: NewRopstenTransactionActionConfig = action.config;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		const transaction = await EtherscanService.getRopstenTransactions(actionConfig.address);

		// If there is not any message according to action config, there is no trigger
		if (!transaction)
			return false;

		// Check if the last message extracted from Telegram is same that last message in last trigger history
		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			// Same messages are same, there is no trigger
			if (triggerDifferentiator['hash'] === transaction.hash)
				return false;
		}

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{hash: transaction.hash},
			JSON.stringify(transaction)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
	// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract message from trigger history
		const transaction = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewRopstenTransactionActionTemplate = {
			from: transaction.from,
			timestamp: transaction.timeStamp,
			value: transaction.value / Math.pow(10, transaction.tokenDecimal),
			token: transaction.tokenSymbol,
			confirmation: transaction.confirmations,
			txhash: transaction.hash,
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewRopstenTransaction();