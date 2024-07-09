import { Router } from 'express';
import {
  sanitizeTopicInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './topic.controller.js';

export const topicRouter = Router();

topicRouter.get('/', findAll);
topicRouter.get('/:id', findOne);
topicRouter.post('/', sanitizeTopicInput, add);
topicRouter.put('/:id', sanitizeTopicInput, update);
topicRouter.patch('/:id', sanitizeTopicInput, update);
topicRouter.delete('/:id', remove);
