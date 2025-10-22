import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = Router(); // router works like mini app to handle related routes, similar to app

router.post("/register", register);
router.post("/login", login);

export default router;
