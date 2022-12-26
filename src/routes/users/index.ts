import { Router } from "express";
import { UserController } from "../../controllers/UserController";

const userRoutes = Router();

userRoutes.post('/', new UserController().createUser);
userRoutes.get('/' , new UserController().listUsers);

export default userRoutes;