import { Router } from "express";
import userRoutes from "./users";
import loginRouter from "./login";
import profileRouter from "./profile";
import { authMiddleware } from "../middlewares/authentication";

const router = Router();

router.use('/user', userRoutes);
router.use('/login', loginRouter);
router.use('/profile', authMiddleware, profileRouter);

export default router;