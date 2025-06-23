import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
import validateObjectId from "../../middlewares/idValidator.js";
import { AuthGuard, RoleGuard } from "../../middlewares/auth.middlewares.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(AuthGuard, RoleGuard("admin"), createProduct);

router.get("/:slug", getProduct);

router
  .route("/:id")
  .all(AuthGuard, RoleGuard("admin"), validateObjectId)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
