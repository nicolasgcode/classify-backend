import { Router } from 'express';
import {
  sanitizedInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/level.controller.js';

export const levelRouter = Router();

levelRouter.get('/', findAll);
levelRouter.get('/:id', findOne);
levelRouter.post('/', sanitizedInput, add);
levelRouter.put('/:id', sanitizedInput, update);
levelRouter.delete('/:id', remove);
