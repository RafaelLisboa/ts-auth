import appDataSource from "../data-source";
import Role from "../domain/Role";

export const roleRepository = appDataSource.getRepository(Role);