import { Router } from 'express';
import {
  sanitizedInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/subsPurchaseRecord.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

export const subsPurchaseRecordRouter = Router();

subsPurchaseRecordRouter.get('/', findAll);
subsPurchaseRecordRouter.get('/:id', requireAuth, requireAdmin, findOne);
subsPurchaseRecordRouter.post(
  '/',
  sanitizedInput,
  requireAuth,
  requireAdmin,
  add
);
subsPurchaseRecordRouter.put(
  '/:id',
  sanitizedInput,
  requireAuth,
  requireAdmin,
  update
);
subsPurchaseRecordRouter.delete('/:id', requireAuth, requireAdmin, remove);
