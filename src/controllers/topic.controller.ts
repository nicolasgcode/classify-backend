import { Request, Response } from 'express';
import { Topic } from '../entities/topic.entity.js';
import { orm } from '../shared/orm.js';
import { validateTopic } from '../schemas/topic.schema.js';
import { ZodError } from 'zod';

const em = orm.em;

em.getRepository(Topic);

async function add(req: Request, res: Response) {
  try {
    const parsedData = validateTopic(req.body.sanitizedInput);
    const topic = em.create(Topic, parsedData);
    await em.flush();
    res.status(201).json({ message: 'Topic created', data: topic });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message })));
    }
    res.status(500).send({ message: error.message });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const topics = await em.find(Topic, {});
    res.json({ message: 'Finded all topics', data: topics });
  } catch (error: any) {
    res.status(500).json({ message: 'Error finding topics' });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const topic = await em.findOneOrFail(Topic, { id });
    res.status(200).json({ message: 'Finded topic', data: topic });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const topic = em.getReference(Topic, id);
    em.assign(topic, req.body);
    await em.flush();
    res.status(200).json({ message: 'Topic updated', data: topic });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const topic = em.getReference(Topic, id);
    await em.removeAndFlush(topic);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove };
