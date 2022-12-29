import { Router } from "express";
import rolesRouter from "./roles";
import userRoutes from "./users";
import loginRouter from "./login";
import profileRouter from "./profile";
import { authMiddleware } from "../middlewares/authentication";

const router = Router();

router.use('/roles', rolesRouter);
router.use('/user', userRoutes);
router.use('/login', loginRouter);

router.use(authMiddleware);

router.use('/profile', profileRouter);

export default router;