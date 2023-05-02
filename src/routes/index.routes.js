import { Router } from "express";
import authRouter from "./auth.routes.js";
import { authValidation } from "../middlewares/authMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import { checkoutSchema } from "../schemas/checkoutSchema.js";
import { handleCheckout } from "../controllers/checkout.controllers.js";
import productsRouter from "./products.routes.js";

const router = Router();
router.use(authRouter);
router.use(productsRouter);

router.post(
	"/checkout",
	authValidation,
	validateSchema(checkoutSchema),
	handleCheckout
);

export default router;
