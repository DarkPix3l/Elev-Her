import express from "express";
import { AuthGuard, RoleGuard } from "../../middlewares/auth.middlewares.js";
import validateObjectId from "../../middlewares/idValidator.js";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./users.controller.js";
import { adminCreateUser, updateUserSchema } from "./users.validator.js";

const router = express.Router();

router
  .route("/")
  //.all(AuthGuard, RoleGuard("admin"))
  .get(getUsers)
  .post(validate(adminCreateUser), createUser); //for user see "signup"

router
  .route("/:id")
  //.all(AuthGuard, validateObjectId)
  .get(getUser)
  .put(validate(updateUserSchema),updateUser)
  .delete(deleteUser);

export default router;
