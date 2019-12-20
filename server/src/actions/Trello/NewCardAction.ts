import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import TrelloService from "../../services/TrelloService";
import {Service} from "../../models/Service";

export interface NewCardActionConfig {
	boardId?: string,
}

export interface NewCardActionTemplate {
	id: string;
	name: string;
	url: string;
}

class NewCardAction extends AbstractAction {
	constructor() {
		super();
		this._service = TrelloService;
		this._name = "TrelloNewCardAction";
		this._litteralName = "New card created into board";
		this._description = "Fetch new card created into Trello specific board";

		this._configFields = [
			{name: "The ID of the board", variable: "boardId", type: "string", description: "Trigger action when new Trello card is created into this board"}
		];

		this._templateFields = [
			{name: "ID", variable: "id", description: "The ID of the card"},
			{name: "Name", variable: "name", description: "The name of the card"},
			{name: "URL", variable: "url", description: "The URL of the card"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get action config for this action
		const actionConfig: NewCardActionConfig = action.config;
		if (!actionConfig.boardId)
			return false;

		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Get all trello cards
		const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});
		const cards = (await TrelloService.getCardsInBoard(service.token, actionConfig.boardId));
		const cardIds = [];
		let newCard = null;

		if (!cards)
			return false;

		for (const card of cards) {
			cardIds.push(card.id);
		}

		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			for (const card of cards) {
				if (!triggerDifferentiator['cardIds'].includes(card.id)) {
					newCard = card;
				}
			}
		} else {
			newCard = cards[0];
		}

		if (newCard === null)
			return false;

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{cardIds},
			JSON.stringify(newCard)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract notification from trigger history
		const card = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewCardActionTemplate = {
			id: card.id,
			name: card.name,
			url: card.url
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewCardAction();