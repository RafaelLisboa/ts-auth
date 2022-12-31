import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("tokens")
export class Token {

    @PrimaryGeneratedColumn()
    public id:string;

    @Column()
    public tokenHash:string;

    @Column()
    public userId:string;

    @UpdateDateColumn()
    public updatedAt:Date;
}