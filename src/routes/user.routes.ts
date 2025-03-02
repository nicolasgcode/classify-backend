import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
  getUserCourses,
} from '../controllers/user.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';
import { sanitizeInput } from '../middlewares/sanitizeInput.js';

export const userRouter = Router();

userRouter.get('/', requireAuth, requireAdmin, findAll);
userRouter.get('/:id', findOne);
userRouter.get('/:id/courses', requireAuth, getUserCourses);
userRouter.post(
  '/',
  sanitizeInput(['dni', 'name', 'surname', 'email', 'password', 'admin']),
  add
);
userRouter.put(
  '/:id',
  sanitizeInput(['dni', 'name', 'surname', 'email', 'password', 'admin']),
  requireAuth,
  requireAdmin,
  update
);
userRouter.patch(
  '/:id',
  sanitizeInput(['dni', 'name', 'surname', 'email', 'password', 'admin']),
  requireAuth,
  requireAdmin,
  update
);
userRouter.delete('/:id', requireAuth, requireAdmin, remove);
