import express from 'express';
import { AuthGuard, RoleGuard } from '../../middlewares/auth.middlewares.js';
import validateObjectId from '../../middlewares/idValidator.js';
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserAvatar,
} from './users.controller.js';
import { adminCreateUser, updateUserSchema } from './users.validator.js';
import validate from '../../middlewares/p.validator.middleware.js';
import { onlySelfOrAdmin } from './onlySelfOrAdmin.middleware.js';
import upload from '../../middlewares/multer.middleware.js';

const router = express.Router();

router
  .route('/')
  .all(AuthGuard, RoleGuard('admin'))
  .get(getUsers)
  .post(validate(adminCreateUser), createUser);

router
  .route('/:id')
  .all(AuthGuard, validateObjectId, onlySelfOrAdmin)
  .get(getUser)
  .post(validate(updateUserSchema), updateUser)
  .delete(deleteUser);

router
  .route('/:id/avatar')
  .patch(AuthGuard, validateObjectId, onlySelfOrAdmin, upload.single('avatar'), updateUserAvatar);

export default router;
