import { Router } from 'express';
import {
  sanitizeCoursePurchaseRecordInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/coursePurchaseRecord.controller.js';

export const coursePurchaseRecordRouter = Router();

coursePurchaseRecordRouter.get('/', findAll);
coursePurchaseRecordRouter.get('/:id', findOne);
coursePurchaseRecordRouter.post('/', sanitizeCoursePurchaseRecordInput, add);
coursePurchaseRecordRouter.put(
  '/:id',
  sanitizeCoursePurchaseRecordInput,
  update
);
coursePurchaseRecordRouter.delete('/:id', remove);
