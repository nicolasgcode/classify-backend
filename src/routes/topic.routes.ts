import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/topic.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';
import { sanitizeInput } from '../middlewares/sanitizeInput.js';

export const topicRouter = Router();

topicRouter.get('/', requireAuth, requireAdmin, findAll);
topicRouter.get('/:id', requireAuth, requireAdmin, findOne);
topicRouter.post(
  '/',
  sanitizeInput(['description']),
  requireAuth,
  requireAdmin,
  add
);
topicRouter.put(
  '/:id',
  sanitizeInput(['description']),
  requireAuth,
  requireAdmin,
  update
);
topicRouter.delete('/:id', requireAuth, requireAdmin, remove);
