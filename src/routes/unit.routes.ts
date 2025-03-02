import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/unit.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';
import { sanitizeInput } from '../middlewares/sanitizeInput.js';

export const unitRouter = Router();

unitRouter.get('/', requireAuth, requireAdmin, findAll);
unitRouter.get('/:id', requireAuth, requireAdmin, findOne);
unitRouter.post('/', requireAuth, requireAdmin, add);
unitRouter.put(
  '/:id',
  sanitizeInput(['title', 'description', 'content']),
  requireAuth,
  requireAdmin,
  update
);
unitRouter.patch(
  '/:id',
  sanitizeInput(['title', 'description', 'content']),
  requireAuth,
  requireAdmin,
  update
);
unitRouter.delete('/:id', requireAuth, requireAdmin, remove);
