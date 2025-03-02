import { Router } from 'express';

import {
  add,
  remove,
  findOne,
  findAll,
  update,
} from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.get('/', findAll);

export default orderRouter;
