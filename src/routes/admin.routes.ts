import { Router } from 'express';
import {
  sanitizeUserInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './../controllers/admin.controller.js';
export const adminRouter = Router();

adminRouter.get('/', findAll);
adminRouter.get('/:id', findOne);
adminRouter.post('/', sanitizeUserInput, add);
adminRouter.put('/:id', sanitizeUserInput, update);
adminRouter.delete('/:id', remove);
