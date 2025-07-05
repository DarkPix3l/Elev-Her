import express from "express";
import { login, signup, googleAuth } from "./auth.controller.js";
import { signupSchema, loginSchema } from "./auth.validators.js";
import { validate } from "./auth.middlewares-local.js";

const router = express.Router();


router.post("/signup", validate(signupSchema), signup);

router.post("/login", validate(loginSchema), login);
router.post('/google', googleAuth);

export default router;
