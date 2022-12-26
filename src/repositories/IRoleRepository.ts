import Role from "../domain/Role";

export default interface IRoleRepository {
  list():Promise<Role[]>;
  getById(id:string):Promise<Role | null>;
  create(role:Role):Promise<Role>;
}