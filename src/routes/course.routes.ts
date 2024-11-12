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

export const courseRouter = Router();

courseRouter.get('/', findAll);
courseRouter.get('/:id', findOne);
courseRouter.post('/', sanitizeCourseInput, add);
courseRouter.put('/:id', sanitizeCourseInput, update);
courseRouter.delete('/:id', requireAuth, remove);
courseRouter.post('/:courseId/units', addUnitToCourse);
courseRouter.get('/:courseId/units', getUnitsByCourse);
