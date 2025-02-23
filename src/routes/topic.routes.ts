import { Router } from 'express';
import {
  sanitizedInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/topic.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

export const topicRouter = Router();

topicRouter.get('/', requireAuth, requireAdmin, findAll);
topicRouter.get('/:id', requireAuth, requireAdmin , findOne);
topicRouter.post('/', sanitizedInput, requireAuth, requireAdmin, add);
topicRouter.put('/:id', sanitizedInput, requireAuth, requireAdmin, update);
topicRouter.delete('/:id', requireAuth, requireAdmin, remove);
