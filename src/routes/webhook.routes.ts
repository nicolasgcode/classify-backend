import { stripeWebhook } from '../utils/stripeWebhook.js';
import express from 'express';

import { Router } from 'express';

export const webhookRouter = Router();

webhookRouter.post(
  '/',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);
