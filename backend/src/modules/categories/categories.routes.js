import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory
} from './categories.controller.js';

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);

router.route("/:id").get(getCategoryById).delete(deleteCategory);

export default router;
