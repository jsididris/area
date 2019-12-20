import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import {Action} from "./Action";

@Entity()
export class TriggerHistory extends BaseEntity {
	/**
	 * It's unique ID
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * It define the trigger differentiator of the trigger history (gathered directly by the Action class to check if the action can be triggered)
	 */
	@Column('json')
	trigger_differentiator: object;

	/**
	 * It define the raw fetched content associated to the trigger history of an action
	 */
	@Column({nullable: true})
	fetched_content: string;

	/**
	 * It's define success status of the trigger history
	 */
	@Column({default: true})
	status: boolean;

	/**
	 * It define the error message of the trigger history
	 */
	@Column({nullable: true})
	error_message: string;

	/**
	 * It define the parent Action that own this trigger history
	 */
	@ManyToOne(() => Action, (action) => action.reactions)
	@JoinColumn({name: "action_id"})
	action: Action;
}