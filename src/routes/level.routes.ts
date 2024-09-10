import { Router } from 'express';
import {
  sanitizeLevelInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/level.controller.js';

export const levelRouter = Router();

levelRouter.get('/', findAll);
levelRouter.get('/:id', findOne);
levelRouter.post('/', add);
levelRouter.put('/:id', update);
levelRouter.delete('/:id', remove);
