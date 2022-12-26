import { Router } from "express";
import rolesRouter from "./roles/roles.router";


const router = Router();

router.use('/roles', rolesRouter);

export default router;