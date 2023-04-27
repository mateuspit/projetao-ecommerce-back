import { Router } from "express";
import authRouter from "./auth.routes.js";
import { authValidation } from "../middlewares/AuthMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import { checkoutSchema } from "../schemas/CheckoutSchema.js";
import { handleCheckout } from "../controllers/checkoutController.js";

const router = Router();
router.use(authRouter);

router.post(
	"/checkout",
	authValidation,
	validateSchema(checkoutSchema),
	handleCheckout
);

export default router;
