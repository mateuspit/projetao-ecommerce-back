import {Router} from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import {signUpSchema, signInSchema} from "../schemas/authSchema.js";
import {signUp, signIn, logout} from "../controllers/auth.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);
authRouter.delete("/logout", authValidation, logout); 
//Não existe schema para o token, por isso authValidation n recebe nada.

export default authRouter;
