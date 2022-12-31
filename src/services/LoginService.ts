import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Errors } from '../common/errors/ErrorsEnum';
import ServiceException from '../common/errors/ServiceExcepiton';
import { ResponseStatusCode } from '../common/http/ResponseStatusCode';
import User from '../domain/User';
import { tokenRepository } from '../repositories/TokenRepository';
import { userRepository } from '../repositories/UserRepository';

export class LoginSerice {
    private static TOKEN_EXPIRES = 60 * 15; // 15 Minutes

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
            return await this.saveNewToken(registeredUser);
        }

        throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.USER_DOESNT_EXISTIS);
    }


    async saveNewToken(user: User) {

        const {acess_token, expiresIn} = await this.createToken(user);
        const oldToken = await this.userAlreadyHasTokenToUpdate(user);
        if (oldToken) {
            tokenRepository.update(oldToken?.id!, {tokenHash: acess_token});
        }
        else {
            tokenRepository.save({
                userId: user.id,
                tokenHash: acess_token
            });
        }
        return {
            acess_token,
            expiresIn
        }
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
        return {
            acess_token: token,
            expiresIn: new Date(expiresIn)
        }
    }

    private async userAlreadyHasTokenToUpdate(user: User) {
        return await tokenRepository.findOneBy({
            userId: user.id
        });
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


    async refreshToken(oldToken: string) {
        const savedToken = await tokenRepository.findOneBy({
            tokenHash: oldToken
        });

        if (savedToken === null) {
            throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.INVALID_TOKEN)
        }

        const userOfToken = await userRepository.findOneByOrFail({
            id: savedToken?.userId
        });


        return await this.saveNewToken(userOfToken);
    }


}
export const loginSerice = new LoginSerice();