import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './purchaseRecord.controller.js';

export const purchaseRecordRouter = Router();

purchaseRecordRouter.get('/', findAll);
purchaseRecordRouter.get('/:id', findOne);
purchaseRecordRouter.post('/', add);
purchaseRecordRouter.put('/:id', update);
purchaseRecordRouter.delete('/:id', remove);
