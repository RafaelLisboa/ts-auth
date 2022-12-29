import { NextFunction, Request, Response } from "express";
import User from "../domain/User";
import { LoginSerice, loginSerice } from "../services/LoginService";


export class LoginController {
    
    async login(req:Request, resp:Response, next:NextFunction) {
        try {
            const userLogin:User = {
                username: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

             resp.send(await loginSerice.login(userLogin)); 
        }
        catch(error) {
            next(error);
        }
    }
}