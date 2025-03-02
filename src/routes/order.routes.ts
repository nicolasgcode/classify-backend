import { Router } from 'express';

import { findAll } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.get('/', findAll);

export default orderRouter;
