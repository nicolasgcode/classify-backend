import { Router } from 'express';
import {
  sanitizeTopicInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from '../topic/topic.controller.js';

export const topicRouter = Router();

topicRouter.get('/', findAll);
topicRouter.get('/:id', findOne);
topicRouter.post('/', add);
topicRouter.put('/:id', update);
topicRouter.delete('/:id', remove);
