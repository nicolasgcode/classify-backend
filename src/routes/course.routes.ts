import { Router } from 'express';
import {
  sanitizeCourseInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/course.controller.js';

import { requireAuth } from '../middlewares/requireAuth.js';

export const courseRouter = Router();

courseRouter.get('/', requireAuth, findAll);
courseRouter.get('/:id', requireAuth, findOne);
courseRouter.post('/', requireAuth, sanitizeCourseInput, add);
courseRouter.put('/:id', requireAuth, sanitizeCourseInput, update);
courseRouter.delete('/:id', requireAuth, remove);
