import { v4 } from "uuid";
import ServiceException from "../common/errors/ServiceExcepiton";
import { ResponseStatusCode } from "../common/http/ResponseStatusCode";
import { roleRepository } from "../repositories/RoleRepository";
import Role from "../domain/Role";

class RoleService {

  constructor() { }

  public async createRole(name:string): Promise<Role> {
      console.log('Creating a new role with name ' + name);
      const roleAlreadyExist: boolean = await roleRepository.findOneBy({
        name: name
      }) !== null;

      if (roleAlreadyExist) {
        throw new ServiceException(ResponseStatusCode.LOGIC_ERROR, "This role already existis");
      }

      let newRole = roleRepository.create({
        id: v4(),
        name: name,
      });
      return await roleRepository.save(newRole);
  }

  public async listRoles(): Promise<Role[]> {
    console.log("Listing the saved roles");
    return await roleRepository.find();
  }

}

export const roleService: RoleService = new RoleService();