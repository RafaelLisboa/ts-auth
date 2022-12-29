import { Errors } from "../common/errors/ErrorsEnum";
import ServiceException from "../common/errors/ServiceExcepiton";
import { ResponseStatusCode } from "../common/http/ResponseStatusCode";
import User from "../domain/User";
import { userRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { roleService } from "./RoleService";

export class LoginSerice {
    private static TOKEN_EXPIRES = 60 * 2;

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

        if (registeredUser !== null && await this.userHasDefaultRole(registeredUser)) {
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

        throw new ServiceException(ResponseStatusCode.UNATHORIZED, Errors.USER_DOESNT_EXISTIS);
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

    private async userHasDefaultRole(user: User) {
        const defaultRoleId = (await roleService.getNewUserDefaultRole()).id;
        return user.roleIds?.find(roleId => roleId === defaultRoleId) !== null;
    }

}
export const loginSerice = new LoginSerice();