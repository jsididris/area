import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import TrelloService from "../../services/TrelloService";
import {Service} from "../../models/Service";

export interface NewBoardActionTemplate {
	id: string;
	name: string;
	url: string;
	desc: string;
}

class NewBoardAction extends AbstractAction {
	constructor() {
		super();
		this._service = TrelloService;
		this._name = "TrelloNewBoardAction";
		this._litteralName = "New board created";
		this._description = "Fetch new board created into Trello";

		this._configFields = [];

		this._templateFields = [
			{name: "ID", variable: "id", description: "The ID of the board"},
			{name: "Name", variable: "name", description: "The name of the board"},
			{name: "URL", variable: "url", description: "The URL of the board"},
			{name: "Description", variable: "desc", description: "The description of the board"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});
		const boards = (await TrelloService.getBoards(service.token));
		const boardIds = [];
		let newBoard = null;

		if (!boards)
			return false;

		for (const board of boards) {
			boardIds.push(board.id);
		}

		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			for (const board of boards) {
				if (!triggerDifferentiator['boardIds'].includes(board.id)) {
					newBoard = board;
				}
			}
		} else {
			newBoard = boards[0];
		}

		if (newBoard === null)
			return false;

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{boardIds},
			JSON.stringify(newBoard)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		// Extract board from trigger history
		const board = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewBoardActionTemplate = {
			id: board.id,
			name: board.name,
			url: board.url,
			desc: board.desc
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewBoardAction();