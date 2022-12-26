import { Router } from "express";
import RoleController from "../../controllers/RoleController";

const rolesRouter = Router();

rolesRouter.post('/', new RoleController().createRole);
rolesRouter.get('/', new RoleController().listRoles);

export default rolesRouter;