import { Router } from 'express';
import {
  sanitizeAdminInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './admin.controller.js';

export const adminRouter = Router();

adminRouter.get('/', findAll);
adminRouter.get('/:id', findOne);
adminRouter.post('/', sanitizeAdminInput, add);
adminRouter.put('/:id', sanitizeAdminInput, update);
adminRouter.delete('/:id', remove);
