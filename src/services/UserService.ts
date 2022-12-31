import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

import { Errors } from '../common/errors/ErrorsEnum';
import ServiceException from '../common/errors/ServiceExcepiton';
import { ResponseStatusCode } from '../common/http/ResponseStatusCode';
import User from '../domain/User';
import { userRepository } from '../repositories/UserRepository';

class UserService {

  private static readonly SALT = 6;

  async createUser(user: User) {
    if (user.username === "" || user.username === null) {
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

    user.password = await bcrypt.hash(user.password, UserService.SALT);
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


  async getUserById(id: string) {
    return await userRepository.findOneBy({
      id: id
    });
  }
}

export const userService = new UserService();