import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Role from "./Role";

@Entity("users")
export default class User {
  @PrimaryColumn()
  public id:string;
  @Column()
  public username:string;
  @Column(() => Role)
  public roles:Role[];
  @CreateDateColumn()
  public created_at:Date;
  @UpdateDateColumn()
  public updated_at:Date;
}