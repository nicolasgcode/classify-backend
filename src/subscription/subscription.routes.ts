import { Router } from 'express';
import {
  sanitizeSubscriptionInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './subscription.controller.js';

export const subscriptionRouter = Router();

subscriptionRouter.get('/', findAll);
subscriptionRouter.get('/:id', findOne);
subscriptionRouter.post('/', sanitizeSubscriptionInput, add);
subscriptionRouter.put('/:id', sanitizeSubscriptionInput, update);
subscriptionRouter.patch('/:id', sanitizeSubscriptionInput, update);
subscriptionRouter.delete('/:id', remove);
