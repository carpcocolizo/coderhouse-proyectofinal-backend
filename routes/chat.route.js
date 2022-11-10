import { chatController, chatEmail } from "../controllers/chatController.js";
import { Router } from "express";
import { checkAuthentication } from "../src/utils/aux.functions.js";

const router = Router();

router.get("/", checkAuthentication, chatController)
router.get("/:email",checkAuthentication, chatEmail)

export default router;
