import { Router } from 'express';
import { checkout } from '../controllers/stripe.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';

export const checkoutRouter = Router();

checkoutRouter.post('/', requireAuth, checkout);
