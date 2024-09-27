import { Router } from 'express';
import {
  sanitizedInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../controllers/topic.controller.js';

export const topicRouter = Router();

topicRouter.get('/', findAll);
topicRouter.get('/:id', findOne);
topicRouter.post('/', sanitizedInput, add);
topicRouter.put('/:id', sanitizedInput, update);
topicRouter.delete('/:id', remove);
