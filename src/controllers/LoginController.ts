import { NextFunction, Request, Response } from 'express';
import { Errors } from '../common/errors/ErrorsEnum';
import ServiceException from '../common/errors/ServiceExcepiton';
import { ResponseStatusCode } from '../common/http/ResponseStatusCode';

import User from '../domain/User';
import { loginSerice } from '../services/LoginService';


export class LoginController {

    async login(req: Request, resp: Response, next: NextFunction) {
        try {
            const userLogin: User = {
                username: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            resp.send(await loginSerice.login(userLogin));
        }
        catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request, resp: Response, next: NextFunction) {
        try {
            const refreshToken = req.headers.authorization;
            if (refreshToken === null || refreshToken === undefined) {
                throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.UNATHORIZED_USER);
            }
            
            resp.send(await loginSerice.refreshToken(refreshToken));
        }
        catch(error) {

        }
    }
}