import { Router } from 'express';
import {
  sanitizeLevelInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../level/level.controller.js';

export const levelRouter = Router();

levelRouter.get('/', findAll);
levelRouter.get('/:id', findOne);
levelRouter.post('/',sanitizeLevelInput,  add);
levelRouter.put('/:id', sanitizeLevelInput, update);
levelRouter.delete('/:id', remove);
