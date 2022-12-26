import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export default class Role {
  @PrimaryColumn()
  public id?: string;
  @Column({ unique: true , length: 50})
  public name: string;
  @CreateDateColumn()
  public created_at?: Date;
}