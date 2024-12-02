import { Router } from 'express';
import {
  SanitizedInput,
  findAll,
  findOne,
  add,
} from '../controllers/coursePurchaseRecord.controller.js';

export const coursePurchaseRecordRouter = Router();

coursePurchaseRecordRouter.get('/', findAll);
coursePurchaseRecordRouter.get('/:id', findOne);
coursePurchaseRecordRouter.post('/', SanitizedInput, add);
