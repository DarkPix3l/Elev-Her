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

const router = express.Router();

router
  .route("/")
  //.all(AuthGuard, RoleGuard("admin"))
  .get(getUsers)
  .post(createUser); //for user see "signup"

router
  .route("/:id")
  //.all(AuthGuard, validateObjectId)
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
