import { Router } from "express";
import productRouter from "./product.route.js";
import authRouter from "./auth.route.js";
import cartRouter from "./cart.route.js"
import infoRouter from "./info.route.js"
import chatRouter from "./chat.route.js"

const router = Router();

router.use("/", authRouter)
router.use("/api/productos", productRouter);
router.use("/api/carrito", cartRouter)
router.use("/info", infoRouter)
router.use("/chat", chatRouter)

export default router;