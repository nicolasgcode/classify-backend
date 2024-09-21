import { Request, Response, NextFunction } from 'express';
import { Unit } from '../unit/unit.entity.js';
import { orm } from '../../shared/orm.js';

const em = orm.em;

function sanitizeUnitInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    number: req.body.number,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  });
  next();
}

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
    const unit = await em.findOneOrFail(Unit, { id });
    res.status(200).json({ message: 'found unit', data: unit });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const unit = em.create(Unit, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'unit added', data: unit });
  } catch (error: any) {
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
  try {
    const id = Number.parseInt(req.params.id);
    const unit = em.getReference(Unit, id);
    await em.removeAndFlush(unit);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeUnitInput, findAll, findOne, add, update, remove };
