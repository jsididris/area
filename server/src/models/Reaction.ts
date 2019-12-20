import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import {Action} from "./Action";

@Entity()
export class Reaction extends BaseEntity {
	/**
	 * It's unique ID
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * It define the class name of the Reaction
	 */
	@Column()
	class_name: string;

	/**
	 * It define the configuration associated to the Reaction (gathered directly by the class)
	 */
	@Column('json')
	config: object;

	/**
	 * It define the parent Action that own this Reaction
	 */
	@ManyToOne(() => Action, (action) => action.reactions)
	@JoinColumn({name: "action_id"})
	action: Action;
}