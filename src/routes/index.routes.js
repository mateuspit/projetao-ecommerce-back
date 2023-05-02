import { Router } from "express";
import authRouter from "./auth.routes.js";

import productsRouter from "./products.routes.js";

const router = Router();
router.use(authRouter);
router.use(productsRouter);

export default router;
