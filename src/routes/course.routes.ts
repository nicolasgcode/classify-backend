import { Router } from 'express';
import {
  sanitizeCourseInput,
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

export const courseRouter = Router();

courseRouter.get('/', requireAuth, findAll);
courseRouter.get('/:id', findOne, requireAuth);
courseRouter.post('/', sanitizeCourseInput, requireAuth, requireAdmin, add);
courseRouter.put(
  '/:id',
  sanitizeCourseInput,
  requireAuth,
  requireAdmin,
  update
);
courseRouter.patch(
  '/:id',
  sanitizeCourseInput,
  requireAuth,
  requireAdmin,
  update
);
courseRouter.delete('/:id', requireAuth, requireAdmin, remove);
courseRouter.post(
  '/:courseId/units',
  requireAuth,
  requireAdmin,
  addUnitToCourse
);
courseRouter.get('/:courseId/units', requireAuth, getUnitsByCourse);
