import { v4 } from "uuid";
import ServiceException from "../common/errors/ServiceExcepiton";
import { ResponseStatusCode } from "../common/http/ResponseStatusCode";
import { roleRepository } from "../repositories/RoleRepository";
import Role from "../domain/Role";
import { Errors } from "../common/errors/ErrorsEnum";
import { randomUUID } from "crypto";

class RoleService {

  constructor() { }

  async createRole(name: string): Promise<Role> {
    console.log('Creating a new role with name ' + name);

    if (name === "" || name.trim().length === 0) {
      throw new ServiceException(ResponseStatusCode.LOGIC_ERROR, Errors.NAME_CANT_BE_EMPTY);
    }

    const roleAlreadyExist: boolean = await roleRepository.findOneBy({
      name: name
    }) !== null;

    if (roleAlreadyExist) {
      throw new ServiceException(ResponseStatusCode.LOGIC_ERROR, Errors.ROLE_ALREADY_EXISTS);
    }

    let newRole = roleRepository.create({
      id: v4(),
      name: name,
    });
    return await roleRepository.save(newRole);
  }

  async listRoles(): Promise<Role[]> {
    console.log("Listing the saved roles");
    return await roleRepository.find();
  }

  async getNewUserDefaultRole(): Promise<Role> {
    let role = await roleRepository.findOneBy({
      name: "New User"
    });

    if (role == null) {
      throw new ServiceException(ResponseStatusCode.FATAL_ERROR, Errors.ERROR_TO_VERIFY_USER_ROLE);
    }

    return role;
  }


  async setNewUserDefaultRole(): Promise<Role> {
    let role = await roleRepository.findOneBy({
      name: "New User"
    });

    if (role == null) {
      role = await this.createUserDefaultRole();
    }
    return role;
  }

  private async createUserDefaultRole(): Promise<Role> {
    return await roleRepository.save({
      id: randomUUID(),
      name: "New User"
    });
  }
}

export const roleService: RoleService = new RoleService();