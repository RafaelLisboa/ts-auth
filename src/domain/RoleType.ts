import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("roles_types")
export default class RoleType {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
}