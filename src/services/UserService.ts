import { randomUUID } from "crypto";
import { Errors } from "../common/errors/ErrorsEnum";
import ServiceException from "../common/errors/ServiceExcepiton";
import { ResponseStatusCode } from "../common/http/ResponseStatusCode";
import User from "../domain/User";
import { userRepository } from "../repositories/UserRepository";
import { roleService } from "./RoleService";
import bcrypt from 'bcrypt'

class UserService {

  async createUser(user: User) {
    if (user.username === "" || user.username.length === 0) {
      throw new ServiceException(ResponseStatusCode.LOGIC_ERROR, Errors.NAME_CANT_BE_EMPTY);
    }

    console.log("Verifying weather this user existis -> " + JSON.stringify(user));

    const useremailAlreadyExists = await userRepository.findOneBy({
      email: user.email
    }) != null;

    if (useremailAlreadyExists) {
      throw new ServiceException(ResponseStatusCode.LOGIC_ERROR, Errors.USER_ALREADY_EXISTS);
    }

    user.id = randomUUID();
    user = await this.setDefaultRole(user);

    user.password = await bcrypt.hash(user.password, 6);
    userRepository.create(user);
    return await userRepository.save(user);
  }


  async listUsers() {
    return await userRepository.find({
      order: {
        username: "ASC",
        created_at: "DESC"
      },
    });
  }

  private async setDefaultRole(user:User) {
    const userDefaultRole = await roleService.setNewUserDefaultRole();
    user.roleIds=[userDefaultRole.id!];
    return user;
  }

  async getUserById(id:string) {
    return await userRepository.findOneBy({
      id: id
    });
  }
}

export const userService = new UserService();