import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RefreshToken } from "./RefreshToken";


@Entity("tokens")
export class Token {

    @PrimaryGeneratedColumn()
    public id:string;

    @Column()
    public tokenHash:string;

    @Column()
    public userId:string;

    @Column({type: "json"})
    public refreshToken:RefreshToken;

}