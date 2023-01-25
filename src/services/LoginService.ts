import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Errors } from '../common/errors/ErrorsEnum';
import ServiceException from '../common/errors/ServiceExcepiton';
import { ResponseStatusCode } from '../common/http/ResponseStatusCode';
import User from '../domain/User';
import { userRepository } from '../repositories/UserRepository';

type JWT = {
    id: string;
}


export class LoginSerice {

    private static TOKEN_EXPIRES = 60 * 15; // 15 Minutes

    private static REFRESH_TOKEN_SECRET = "refresh_token_secret";

  
    async login(user: User) {
        if (await this.userExists(user)) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.USER_DOESNT_EXISTIS);
        }
        console.log("User exists");

        if (!await this.isLoginCorret(user)) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.USER_DOESNT_EXISTIS);
        }
        console.log("The login is correct!");

        const registeredUser = await userRepository.findOneBy({
            email: user.email
        });


        console.log("User gotten by database");

        if (registeredUser !== null) {
            return await this.createToken(registeredUser);
        }

        throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.USER_DOESNT_EXISTIS);
    }


    private async createToken(user: User) {
        const token = jwt.sign({
            id: user.id
        },
            process.env.JWT_SECRET ?? 'null',
            {
                expiresIn: LoginSerice.TOKEN_EXPIRES
            });

        const expiresIn = new Date().setMinutes(new Date().getMinutes() + LoginSerice.TOKEN_EXPIRES);

        const refreshToken = jwt.sign({ id: user.id }, LoginSerice.REFRESH_TOKEN_SECRET, {
            expiresIn: expiresIn * 2
        });


        return {
            acess_token: token,
            refreshToken,
            expiresIn: new Date(expiresIn)
        }
    }


    private async userExists(user: User) {
        return await userRepository.findOneBy({
            email: user.email
        }) === null;
    }

    private async isLoginCorret(user: User) {
        const password: string | undefined = await userRepository.findOne({
            select: {
                password: true
            },
            where: {
                email: user.email,
                id: user.id
            }
        }).then(user => {
            return user?.password
        });

        if (password === undefined) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.USER_DOESNT_EXISTIS);
        }
        console.log("User password -> " + user.password);

        return await bcrypt.compare(user.password, password);
    }

    async refreshToken(refreshToken:string) {

        const bearerToken = refreshToken.split(" ")[1];

        let jwtPayload = null;

        try {
            jwtPayload = jwt.verify(bearerToken, LoginSerice.REFRESH_TOKEN_SECRET) as JWT;
        }
        catch (error) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.UNATHORIZED_USER);
        }

        if (jwtPayload === null || jwtPayload === undefined) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.UNATHORIZED_USER);
        }

        const user = await userRepository.findOneBy({id: jwtPayload.id});

        if (!user) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.UNATHORIZED_USER);
        }

        return this.createToken(user);
    }



}
export const loginSerice = new LoginSerice();