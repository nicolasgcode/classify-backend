import { Router } from 'express';
import {
  sanitizeCourseInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  addUnitToLevel,
} from '../controllers/course.controller.js';

import { requireAuth } from '../middlewares/requireAuth.js';

export const courseRouter = Router();

courseRouter.get('/', findAll);
courseRouter.get('/:id', findOne);
courseRouter.post('/', sanitizeCourseInput, add);
courseRouter.put('/:id', sanitizeCourseInput, update);
courseRouter.delete('/:id', requireAuth, remove);
courseRouter.patch('/:id/levels/:levelId/units', addUnitToLevel);
