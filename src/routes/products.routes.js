import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import {
	getProduct,
	getAllProducts,
} from "../controllers/products.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { checkoutSchema } from "../schemas/checkoutSchema.js";
import { handleCheckout } from "../controllers/checkout.controllers.js";

const productsRouter = Router();

//productsRouter.use(authValidation);

productsRouter.get("/products", getAllProducts);
productsRouter.get("/product/:id", getProduct);
productsRouter.post(
	"/checkout",
	authValidation,
	validateSchema(checkoutSchema),
	handleCheckout
);

export default productsRouter;
