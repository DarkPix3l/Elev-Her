import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product.controller.js';
import validateObjectId from '../../middlewares/idValidator.js';
import { AuthGuard, RoleGuard } from '../../middlewares/auth.middlewares.js';
import { createProductSchema, updateProductSchema } from './products.validator.js';
import validate from '../../middlewares/p.validator.middleware.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route('/')
  .get(getProducts)
  .post(
    AuthGuard,
    RoleGuard('admin'),
    upload.fields([
      { name: 'mainImage', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
    validate(createProductSchema),
    createProduct
  );

router.get('/:slug', getProduct);

router
  .route('/:id')
  .all(AuthGuard, RoleGuard('admin'), validateObjectId)
  .patch(
    upload.fields([
      { name: 'mainImage', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),

    validate(updateProductSchema),
    updateProduct
  )
  .delete(deleteProduct);

export default router;
