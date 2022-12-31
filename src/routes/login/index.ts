import { Router } from "express";
import { LoginController } from "../../controllers/LoginController";

const loginRouter = Router();

loginRouter.post('/', new LoginController().login);
loginRouter.put('/refresh', new LoginController().refreshToken);


export default loginRouter;