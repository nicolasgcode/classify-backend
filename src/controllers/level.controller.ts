import { Request, Response, NextFunction } from 'express';
import { Level } from '../entities/level.entity.js';
import { orm } from '../shared/orm.js';
import { levelSchema } from '../schemas/level.schema.js';
import { ZodError } from 'zod';

const em = orm.em;
em.getRepository(Level);

function sanitizedInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
  }; // Middleware

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  }); // Remove undefined
  next();
}

async function add(req: Request, res: Response) {
  try {
    const parsedData = levelSchema.parse(req.body.sanitizedInput);
    const level = em.create(Level, parsedData);
    await em.flush();
    res.status(201).json({ message: 'Level created', data: level });
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
    const levels = await em.find(Level, {});
    res.json({ message: 'found all levels', data: levels });
  } catch (error: any) {
    res.status(500).json({ message: 'Error finding Levels' });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const level = await em.findOneOrFail(Level, { id });
    res.status(200).json({ message: 'found level', data: level });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const level = em.getReference(Level, id);
    em.assign(level, req.body);
    await em.flush();
    res.status(200).json({ message: 'Level updated', data: level });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const course = em.getReference(Level, id);
    await em.removeAndFlush(course);
    res.status(204).json({ message: 'Level deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedInput, findAll, findOne, add, update, remove };
