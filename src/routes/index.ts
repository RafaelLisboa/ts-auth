import { Router } from "express";
import rolesRouter from "./roles";
import userRoutes from "./users";


const router = Router();

router.use('/roles', rolesRouter);
router.use('/user', userRoutes);

export default router;