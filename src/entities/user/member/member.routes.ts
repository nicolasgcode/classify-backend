import { Router } from 'express';
import {
  sanitizeMemberInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './member.controller.js';

export const memberRouter = Router();

memberRouter.get('/', findAll);
memberRouter.get('/:id', findOne);
memberRouter.post('/', sanitizeMemberInput, add);
memberRouter.put('/:id', sanitizeMemberInput, update);
memberRouter.delete('/:id', remove);
