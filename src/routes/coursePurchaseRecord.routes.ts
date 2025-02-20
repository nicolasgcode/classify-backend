import { Router } from 'express';
import {
  SanitizedInput,
  findAll,
  findOne,
  add,
} from '../controllers/coursePurchaseRecord.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

export const coursePurchaseRecordRouter = Router();

coursePurchaseRecordRouter.get('/', requireAuth, requireAdmin, findAll);
coursePurchaseRecordRouter.get('/:id', requireAuth, requireAdmin, findOne);
coursePurchaseRecordRouter.post(
  '/',
  SanitizedInput,
  requireAuth,
  requireAdmin,
  add
);
