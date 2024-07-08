import { Router } from 'express';
import {
  sanitizePriceSubscriptionInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './priceSubscription.controller.js';

export const priceSubscriptionRouter = Router();

priceSubscriptionRouter.get('/', findAll);
priceSubscriptionRouter.get('/:id', findOne);
priceSubscriptionRouter.post('/', sanitizePriceSubscriptionInput, add);
priceSubscriptionRouter.put('/:id', sanitizePriceSubscriptionInput, update);
priceSubscriptionRouter.patch('/:id', sanitizePriceSubscriptionInput, update);
priceSubscriptionRouter.delete('/:id', remove);
