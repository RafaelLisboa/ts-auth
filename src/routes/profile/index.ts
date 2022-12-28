import { Router } from "express";
import { ProfileController } from "../../controllers/ProfileController";

const profileRouter = Router();

profileRouter.get('/', new ProfileController().getProfile);

export default profileRouter;