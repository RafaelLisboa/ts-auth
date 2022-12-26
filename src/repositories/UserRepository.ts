import appDataSource from "../data-source";
import User from "../domain/User";

export const userRepository = appDataSource.getRepository(User);