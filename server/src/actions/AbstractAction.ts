import {EventEmitter} from "events";
import {Action} from "../models/Action";
import {TriggerHistory} from "../models/TriggerHistory";
import {getRepository} from "typeorm";
import AbstractService from "../services/AbstractService";

export interface ConfigField {
	variable: string;
	name: string;
	type: string;
	description: string;
}

export interface TemplateField {
	name: string;
	variable: string;
	description: string;
}

export default abstract class AbstractAction {
	protected _service: AbstractService;
	protected _name: string;
	protected _litteralName: string;
	protected _description: string;
	protected _configFields: Array<ConfigField>;
	protected _templateFields: Array<TemplateField>;

	/**
	 * Check if the action has a new trigger to handle
	 * @param action The target action data-model
	 *
	 * @return The state of the trigger
	 */
	public abstract async hasTriggered(action: Action): Promise<boolean>;

	/**
	 * Make parsing of target action payload & action event emitting
	 * @param emitter The emitter to emit the action trigger
	 * @param action The target action data-model
	 */
	public abstract async runAction(emitter: EventEmitter, action: Action): Promise<void>;

    /**
     * Get the action service instance
     *
     * @return The action literal name
     */
    public getService(): AbstractService { return this._service; }

	/**
	 * Get the action export name
	 *
	 * @return The action literal name
	 */
	public getName(): string { return this._name; }

	/**
	 * Get the action litteral name
	 *
	 * @return The action literal name
	 */
	public getLitteralName(): string { return this._litteralName; }

	/**
	 * Get the action description
	 *
	 * @return The action literal name
	 */
	public getDescription(): string { return this._description; }

	/**
	 * Get the config fields
	 *
	 * @return An array of available config fields for the action
	 */
	public getConfigFields(): Array<ConfigField> { return this._configFields; }

	/**
	 * Get the template fields
	 *
	 * @return An array to the fields provided to the Reaction template by the action
	 */
	public getTemplateFields(): Array<TemplateField> { return this._templateFields; }

	/**
	 * Get last trigger history for specified action
	 *
	 * @param action The action we wan't to gather last trigger history
	 */
	protected async getLastTriggerHistory(action: Action): Promise<TriggerHistory> {
		return await TriggerHistory.findOne({where: {action}, order: {id: "DESC"}});
	}

	/**
	 * Add success trigger to history
	 *
	 * @param action The related action
	 * @param triggerDifferentiator The payload that make possible differentiation to check future triggers
	 * @param fetchedContent The raw fetched content
	 */
	protected async addSuccessTriggerToHistory(action: Action, triggerDifferentiator: object, fetchedContent: string): Promise<TriggerHistory> {
		const triggerHistory = new TriggerHistory();
		triggerHistory.trigger_differentiator = triggerDifferentiator;
		triggerHistory.fetched_content = fetchedContent;
		triggerHistory.status = true;
		triggerHistory.error_message = null;
		triggerHistory.action = action;

		await triggerHistory.save();
		return triggerHistory;
	}

	/**
	 * Make all reactions un-register globally on specific action
	 * @param emitter
	 * @param action
	 */
	public static unregisterAllReactions(emitter: EventEmitter, action: Action): void {
		for (const reaction of action.reactions) {
			emitter.removeAllListeners(String(reaction.id));
		}
	}
}