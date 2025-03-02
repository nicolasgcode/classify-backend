import { Router } from 'express';
import { findAll } from '../controllers/subscription.controller.js';

export const subscriptionRouter = Router();

subscriptionRouter.get('/', findAll);
