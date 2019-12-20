import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import {User} from "./User";
import {Action} from "./Action";

@Entity()
export class Area extends BaseEntity {
	/**
	 * It's unique ID
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * It define the name of the AREA
	 */
	@Column()
	name: string;

	/**
	 * It define the interval in MS to check if associated action is triggered
	 */
	@Column()
	fetch_time: number;

	/**
	 * It define the child actions of this area
	 */
	@OneToMany(() => Action, (action) => action.area)
	actions: Action[];

	/**
	 * It define the parent User that own this Aeea
	 */
	@ManyToOne(() => User, (user) => user.areas)
	@JoinColumn({name: "user_id"})
	user: User;
}