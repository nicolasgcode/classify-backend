import { Request, Response, NextFunction } from 'express';
import { TopicRepository } from './topic.repository.js';
import { Topic } from './topic.entity.js';

const repository = new TopicRepository();

function sanitizeTopicInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    description: req.body.description,
  }; // Middleware
  //more checks here (content, type)

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  }); // Remove undefined
  next();
}
function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const topic = repository.findOne({ id });
  if (!topic) {
    return res.status(404).send({ message: 'Topic not found' });
  }
  res.json({ data: topic });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  const topicInput = new Topic(
    input.id,
    input.description,
  );

  const topic = repository.add(topicInput);
  return res.status(201).send({ message: 'Topic created', data: topic });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const topic = repository.update(req.body.sanitizedInput);

  if (!topic) {
    return res.status(404).send({ message: 'Topic not found' });
  }

  res.status(200).send({ message: 'Topic edited successfully!', data: topic });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const topic = repository.delete({ id });

  if (!topic) {
    return res.status(404).send({ message: 'Topic not found' });
  }
  return res.status(200).send({ message: 'Topic deleted successfully' });
}

export { sanitizeTopicInput, findAll, findOne, add, update, remove };
