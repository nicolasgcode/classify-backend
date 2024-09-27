import { Router } from 'express';
import {
  // sanitizeSubscriptionInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/subscription.controller.js';

export const subscriptionRouter = Router();

subscriptionRouter.get('/', findAll);
subscriptionRouter.get('/:id', findOne);
subscriptionRouter.post('/', add);
subscriptionRouter.put('/:id', update);
subscriptionRouter.delete('/:id', remove);
