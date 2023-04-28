import { Router } from "express";
import { authValidation } from "../middlewares/authMiddleware.js";
import {
	getProduct,
	getAllProducts,
} from "../controllers/products.controllers.js";

const productsRouter = Router();

productsRouter.use(authValidation);

productsRouter.get("/products", getAllProducts);
productsRouter.get("/product/:id", getProduct);

export default productsRouter;
