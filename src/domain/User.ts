import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity("users")
export default class User {
	@PrimaryColumn()
	public id?: string;
	@Column({
		nullable: false,
	})
	public username: string;
	@Column({
		nullable: false
	})
	public email: string;
	@Column({
		type: "simple-array",
		nullable: true,
	})
	@Column()
	public password: string
	public roleIds?: string[];
	@CreateDateColumn()
	public created_at?: Date;
	@UpdateDateColumn()
	public updated_at?: Date;
}