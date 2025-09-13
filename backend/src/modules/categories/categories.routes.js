import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
} from './categories.controller.js';
import { AuthGuard, RoleGuard } from '../../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/').get(getCategories).post(AuthGuard, RoleGuard('admin'), createCategory);

router.route('/:id').get(getCategoryById).delete(AuthGuard, RoleGuard('admin'), deleteCategory);

export default router;
