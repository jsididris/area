import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import {Area} from "./Area";
import {Reaction} from "./Reaction";
import {TriggerHistory} from "./TriggerHistory";

@Entity()
export class Action extends BaseEntity {
	/**
	 * It's unique ID
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * It define the class name of the Action
	 */
	@Column()
	class_name: string;

	/**
	 * It define the config associated to action (gathered directly by the Action class)
	 */
	@Column('json')
	config: object;

	/**
	 * It define the child reactions of this action
	 */
	@OneToMany(() => Reaction, (reaction) => reaction.action)
	reactions: Reaction[];

	/**
	 * It define the child trigger histories of this action
	 */
	@OneToMany(() => TriggerHistory, (trigger_history) => trigger_history.action)
	trigger_histories: TriggerHistory[];

	/**
	 * It define the parent Area that own this Action
	 */
	@ManyToOne(() => Area, (area) => area.actions)
	@JoinColumn({name: "area_id"})
	area: Area;
}