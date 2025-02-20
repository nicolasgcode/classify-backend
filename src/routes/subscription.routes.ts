import { Router } from 'express';
import {
  sanitizedInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/subscription.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

export const subscriptionRouter = Router();

subscriptionRouter.get('/', findAll);
subscriptionRouter.get('/:id', requireAuth, requireAdmin, findOne);
subscriptionRouter.post('/', requireAuth, requireAdmin, sanitizedInput, add);
subscriptionRouter.put(
  '/:id',
  sanitizedInput,
  requireAuth,
  requireAdmin,
  update
);
subscriptionRouter.delete('/:id', requireAuth, requireAdmin, remove);
