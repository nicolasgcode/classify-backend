import { Router } from 'express';
import {
  sanitizeUserInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  getUserCourses,
} from '../controllers/user.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

export const userRouter = Router();

userRouter.get('/', requireAuth, requireAdmin, findAll);
userRouter.get('/:id', findOne);
userRouter.get('/:id/courses', requireAuth, getUserCourses);
userRouter.post('/', sanitizeUserInput, add);
userRouter.put('/:id', sanitizeUserInput, requireAuth, requireAdmin, update);
userRouter.patch('/:id', sanitizeUserInput, requireAuth, requireAdmin, update);
userRouter.delete('/:id', requireAuth, requireAdmin, remove);
