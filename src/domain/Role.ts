import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export default class Role {
  @PrimaryColumn()
  public id?:string;
  @Column({unique: true})
  public name:string;
  @CreateDateColumn()
  public created_at?:Date;
}