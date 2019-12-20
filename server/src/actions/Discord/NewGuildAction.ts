import AbstractAction from "../AbstractAction";
import {Action} from "../../models/Action";
import {TriggerHistory} from "../../models/TriggerHistory";

import {EventEmitter} from "events";
import {Service} from "../../models/Service";
import DiscordService from "../../services/DiscordService";

export interface NewGuildActionTemplate {
	id: string;
	name: string;
}

class NewGuildAction extends AbstractAction {
	constructor() {
		super();
		this._service = DiscordService;
		this._name = "DiscordNewGuildAction";
		this._litteralName = "New guild joined";
		this._description = "Fetch new guild joined into Discord";

		this._configFields = [];

		this._templateFields = [
			{name: "ID", variable: "id", description: "The ID of the guild"},
			{name: "Name", variable: "name", description: "The name of the guild"},
		];
	}

	async hasTriggered(action: Action): Promise<boolean> {
		// Get last trigger history for this action
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);
		const user = action.area.user;
		const service = await Service.findOne({user, class_name: this._service.getName()});
		const guilds = await DiscordService.getUserGuilds(service.token);

		if (!guilds)
			return false;

		let lastGuild = null;
		const guildNames = [];
		for (const guild of guilds) {
			guildNames.push(guild.name);
		}

		if (lastTriggerHistory) {
			const triggerDifferentiator = lastTriggerHistory.trigger_differentiator;

			for (const guild of guilds) {
				if (!triggerDifferentiator['guildNames'].includes(guild.name))
					lastGuild = guild;
			}
		} else {
			lastGuild = guilds[0];
		}

		if (lastGuild === null)
			return false;

		// Add the trigger to the history
		await this.addSuccessTriggerToHistory(
			action,
			{guildNames},
			JSON.stringify(lastGuild)
		);

		// Finally there is trigger
		return true;
	}

	async runAction(emitter: EventEmitter, action: Action): Promise<void> {
		// Get last trigger history for this action (to get the fetched content)
		const lastTriggerHistory: TriggerHistory = await this.getLastTriggerHistory(action);

		const guild = JSON.parse(lastTriggerHistory.fetched_content);

		// Fill templates fields that will be sent to reactions
		const content: NewGuildActionTemplate = {
			id: guild.id,
			name: guild.name,
		};

		// Emit action triggered with template fields filled for all reactions
		for (const reaction of action.reactions) {
			emitter.emit(String(reaction.id), {...content, reactionId: reaction.id});
		}
	}
}

export default new NewGuildAction();