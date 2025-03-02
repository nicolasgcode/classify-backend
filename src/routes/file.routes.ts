import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/file.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';
import { sanitizeInput } from '../middlewares/sanitizeInput.js';

export const fileRouter = Router();

fileRouter.get('/', requireAuth, findAll);
fileRouter.get('/:id', requireAuth, requireAdmin, findOne);
fileRouter.post(
  '/',
  sanitizeInput(['name', 'type', 'unit']),
  requireAuth,
  requireAdmin,
  add
);
fileRouter.put(
  '/:id',
  sanitizeInput(['name', 'type', 'unit']),
  requireAuth,
  requireAdmin,
  update
);
fileRouter.delete('/:id', requireAuth, requireAdmin, remove);
