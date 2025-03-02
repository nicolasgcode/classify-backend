import { Request, Response, NextFunction } from 'express';
import { Order } from '../entities/order.entity.js';
import { orm } from '../shared/orm.js';
import { validateOrder } from '../schemas/order.schema.js';
import { ZodError } from 'zod';
import { EntityManager } from '@mikro-orm/core';

const em: EntityManager = orm.em.fork();
em.getRepository(Order);

function sanitizeUnitInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const units = await em.find(
      Order,
      {},
      {
        populate: ['orderLines'],
      }
    );
    res.status(200).json({ message: 'found all units', data: units });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const unit = await em.findOneOrFail(
      Order,
      { id },
      { populate: ['orderLines'] }
    );
    res.status(200).json({ message: 'found unit', data: unit });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const validUnit = validateOrder(req.body.sanitizedInput);
    const unit = em.create(Order, validUnit);
    await em.flush();
    const createdUnit = em.getReference(Order, unit.id);
    res.status(201).json({ message: 'unit created', data: createdUnit });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message })));
    }
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const unitToUpdate = await em.findOneOrFail(Order, { id });
    em.assign(unitToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'unit updated', data: unitToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  await em.transactional(async (em) => {
    try {
      const id = Number.parseInt(req.params.id);
      const unit = await em.findOneOrFail(Order, { id });
      await em.removeAndFlush(unit);
      await em.flush();
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
}

export { sanitizeUnitInput, findAll, findOne, add, update, remove };
