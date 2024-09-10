import { Router } from 'express';
import {
  sanitizeUserInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/member.controller.js';

export const memberRouter = Router();

memberRouter.get('/', findAll);
memberRouter.get('/:id', findOne);
memberRouter.post('/', sanitizeUserInput, add);
memberRouter.put('/:id', sanitizeUserInput, update);
memberRouter.delete('/:id', remove);
