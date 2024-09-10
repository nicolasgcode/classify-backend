import { Router } from 'express';
import {
  sanitizeSubsPurchaseRecordInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/subsPurchaseRecord.controller.js';

export const subsPurchaseRecordRouter = Router();

subsPurchaseRecordRouter.get('/', findAll);
subsPurchaseRecordRouter.get('/:id', findOne);
subsPurchaseRecordRouter.post('/', sanitizeSubsPurchaseRecordInput, add);
subsPurchaseRecordRouter.put('/:id', sanitizeSubsPurchaseRecordInput, update);
subsPurchaseRecordRouter.delete('/:id', remove);
