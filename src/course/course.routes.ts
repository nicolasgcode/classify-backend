import { Router } from 'express';
import {
  sanitizeCourseInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './course.controller.js';

export const courseRouter = Router();

courseRouter.get('/', findAll);
courseRouter.get('/:id', findOne);
courseRouter.post('/',sanitizeCourseInput, add);
courseRouter.put('/:id',sanitizeCourseInput, update);
courseRouter.delete('/:id', remove);
