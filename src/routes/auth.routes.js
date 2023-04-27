import {Router} from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import {signUpSchema, signInSchema} from "../schemas/authSchema.js";
import {signUp} from "../controllers/auth.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);

export default authRouter;
