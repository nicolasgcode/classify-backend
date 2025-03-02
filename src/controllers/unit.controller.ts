import { Request, Response } from 'express';
import { Unit } from '../entities/unit.entity.js';
import { orm } from '../shared/orm.js';
import { validateUnit } from '../schemas/unit.schema.js';
import { ZodError } from 'zod';
import { EntityManager } from '@mikro-orm/core';

const em: EntityManager = orm.em.fork();
em.getRepository(Unit);

async function findAll(req: Request, res: Response) {
  try {
    const units = await em.find(Unit, {});
    res.status(200).json({ message: 'found all units', data: units });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const unit = await em.findOneOrFail(Unit, { id }, { populate: ['course'] });
    res.status(200).json({ message: 'found unit', data: unit });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const validUnit = validateUnit(req.body.sanitizedInput);
    const unit = em.create(Unit, validUnit);
    await em.flush();
    const createdUnit = em.getReference(Unit, unit.id);
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
    const unitToUpdate = await em.findOneOrFail(Unit, { id });
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
      const unit = await em.findOneOrFail(Unit, { id });
      await em.removeAndFlush(unit);
      await em.flush();
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
}

export { findAll, findOne, add, update, remove };
