import { Router } from 'express';
import {
  sanitizeUserInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/unit.controller.js';

export const unitRouter = Router();

unitRouter.get('/', findAll);
unitRouter.get('/:id', findOne);
unitRouter.post('/', sanitizeUserInput, add);
unitRouter.put('/:id', sanitizeUserInput, update);
unitRouter.delete('/:id', remove);
