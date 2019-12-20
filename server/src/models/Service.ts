import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Service extends BaseEntity {
	/**
	 * It's unique ID
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * It define the service name
	 */
	@Column()
	name: string;

	/**
	 * It define the class name of the Service
	 */
	@Column()
	class_name: string;

	/**
	 * It define the JSON payload with the auth tokens of the service for the user
	 */
	@Column('json')
	token: object;

	/**
	 * It define the parent User that own this Service
	 */
	@ManyToOne(() => User, (user) => user.services)
	@JoinColumn({name: "user_id"})
	user: User;
}