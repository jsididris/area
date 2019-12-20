import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import {Service} from "./Service";
import {Area} from "./Area";

@Entity()
export class User extends BaseEntity {
	/**
	 * It's unique ID
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * It define the unique user email
	 */
	@Column({unique: true})
	email: string;

	/**
	 * It define the unique user name
	 */
	@Column({unique: true})
	username: string;

	/**
	 * It define the user password
	 */
	@Column()
	password: string;

	/**
	 * It define the user validated-status
	 */
	@Column({default: false})
	validated: boolean;

	/**
	 * It define the child services of the user
	 */
	@OneToMany(() => Service, (service) => service.user)
	services: Service[];

	/**
	 * It define the child areas of the user
	 */
	@OneToMany(() => Area, (area) => area.user)
	areas: Area[];
}