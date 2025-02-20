import { Router } from 'express';
import {
  sanitizeUserInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/file.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

export const fileRouter = Router();

fileRouter.get('/', requireAuth, findAll);
fileRouter.get('/:id', requireAuth, requireAdmin, findOne);
fileRouter.post('/', sanitizeUserInput, requireAuth, requireAdmin, add);
fileRouter.put('/:id', sanitizeUserInput, requireAuth, requireAdmin, update);
fileRouter.delete('/:id', requireAuth, requireAdmin, remove);
