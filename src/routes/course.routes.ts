import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
  addUnitToCourse,
  getUnitsByCourse,
} from '../controllers/course.controller.js';

import { requireAuth } from '../middlewares/requireAuth.js';

import { requireAdmin } from '../middlewares/requireAdmin.js';

import { sanitizeInput } from '../middlewares/sanitizeInput.js';

export const courseRouter = Router();

courseRouter.get('/', requireAuth, findAll);
courseRouter.get('/:id', findOne, requireAuth);
courseRouter.post(
  '/',
  // requireAuth,
  // requireAdmin,
  sanitizeInput(['title', 'price', 'topics', 'level']),
  add
);
courseRouter.put('/:id', requireAuth, requireAdmin, update);
courseRouter.patch('/:id', requireAuth, requireAdmin, update);
courseRouter.delete('/:id', requireAuth, requireAdmin, remove);
courseRouter.post(
  '/:courseId/units',
  requireAuth,
  requireAdmin,
  sanitizeInput(['title', 'description', 'content']),
  addUnitToCourse
);
courseRouter.get('/:courseId/units', requireAuth, getUnitsByCourse);
