import { Router } from 'express';
import {
  sanitizeUnitInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/unit.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

export const unitRouter = Router();

unitRouter.get('/', requireAuth, requireAdmin, findAll);
unitRouter.get('/:id', requireAuth, requireAdmin, findOne);
unitRouter.post('/', sanitizeUnitInput, requireAuth, requireAdmin, add);
unitRouter.put('/:id', sanitizeUnitInput, requireAuth, requireAdmin, update);
unitRouter.patch('/:id', sanitizeUnitInput, requireAuth, requireAdmin, update);
unitRouter.delete('/:id', requireAuth, requireAdmin, remove);
