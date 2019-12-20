import {EventEmitter} from "events";
import {Action} from "../models/Action";
import {TriggerHistory} from "../models/TriggerHistory";
import {getRepository} from "typeorm";

export default abstract class AbstractService {
	protected _name: string;
	protected _litteralName: string;
	protected _description: string;
	protected _url: string;
	protected _logoUrl: string;

	/**
	 * Get the service login URL
	 *
	 * @return The service login URL
	 */
	public abstract async getLoginUrl(): Promise<string>;

	/**
	 * Get token related to service using after OAUTH2 login params (most time the `authorization_code`)
	 *
	 * @return The associated token
	 */
	public abstract async getAuthToken(query: object): Promise<object>;

	/**
	 * Get the service export name
	 *
	 * @return The service literal name
	 */
	public getName(): string { return this._name; }

	/**
	 * Get the service litteral name
	 *
	 * @return The service literal name
	 */
	public getLitteralName(): string { return this._litteralName; }

	/**
	 * Get the service description
	 *
	 * @return The service literal name
	 */
	public getDescription(): string { return this._description; }

	/**
	 * Get the service URL
	 *
	 * @return The service URL
	 */
	public getUrl(): string { return this._url; }

	/**
	 * Get the service logo URL
	 *
	 * @return The service logo URL
	 */
	public getLogoUrl(): string { return this._logoUrl; }
}