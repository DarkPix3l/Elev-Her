import express from "express";
import { login, signup } from "./auth.controller.js";
import { signupSchema, loginSchema } from "./auth.validators.js";
import { validate } from "./auth.middlewares-local.js";

const router = express.Router();


router.post("/signup", validate(signupSchema), signup);

router.post("/login", validate(loginSchema), login);


export default router;
