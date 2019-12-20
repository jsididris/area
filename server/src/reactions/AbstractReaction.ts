import {EventEmitter} from "events";
import {Reaction} from "../models/Reaction";
import AbstractService from "../services/AbstractService";

export interface ConfigField {
	variable: string;
	name: string;
	type: string;
	description: string;
}

export default abstract class AbstractReaction {
	protected _service: AbstractService;
	protected _name: string;
	protected _litteralName: string;
	protected _description: string;
	protected _configFields: Array<ConfigField>;

	/**
	 * Make the reaction according to specified action and action data
	 * @param reaction
	 * @param data The action data
	 */
	protected abstract async runReaction(reaction: Reaction, data: any): Promise<void>;

	/**
	 * Make the reaction register on specific action (and call the runReaction when the action is emitted)
	 * @param emitter The runner event emitter
	 * @param reaction
	 */
	public registerOnReaction(emitter: EventEmitter, reaction: Reaction): void {
		emitter.addListener(String(reaction.id), this.handleRunReaction.bind(this));
	}

	/**
	 * Make the reaction un-register on specific action (and stop calling the runReaction when the action is emitted)
	 * @param emitter
	 * @param reaction
	 */
	public unregisterOnReaction(emitter: EventEmitter, reaction: Reaction): void {
		emitter.removeListener(String(reaction.id), this.handleRunReaction);
	}

	/**
	 * When an registered action is emitted, this function is called with event data (as a payload)
	 * This function take the `actionId` from event payload data, find the corresponding Action in database and call the `runReaction` abstract method
	 * @param data The payload from
	 */
	protected async handleRunReaction(data: any): Promise<void> {
		const reaction = await Reaction.findOne(data.reactionId, {relations: ['action', 'action.area']});

		if (reaction) {
			return this.runReaction(reaction, data);
		}
	}

	/**
	 * Evaluate template by replacing all template variable by her corresponding values
	 *
	 * @param text The text with template variable to replace
	 * @param templatesValues An map of key / values template fields
	 */
	protected evaluateTemplates(text: string, templatesValues: any): string {
		const templateKeys = Object.keys(templatesValues);
		for (const templateKey of templateKeys) {
			const regex = new RegExp(`{${templateKey}}`,"g");
			text = text.replace(regex, templatesValues[templateKey]);
		}

		return text;
	}

	/**
	 * Get the action service instance
	 *
	 * @return The action literal name
	 */
	public getService(): AbstractService { return this._service; }

	/**
	 * Get the reaction export name
	 *
	 * @return The reaction literal name
	 */
	public getName(): string { return this._name; }

	/**
	 * Get the reaction literal name
	 *
	 * @return The reaction literal name
	 */
	public getLitteralName(): string { return this._litteralName; }

	/**
	 * Get the reaction description
	 *
	 * @return The reaction literal name
	 */
	public getDescription(): string { return this._description; }

	/**
	 * Get the config fields
	 *
	 * @return An array of available config fields for the reaction
	 */
	public getConfigFields(): Array<ConfigField> { return this._configFields; }
}