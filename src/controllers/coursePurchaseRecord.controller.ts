import { Request, Response, NextFunction } from 'express';
import { CoursePurchaseRecord } from '../entities/coursePurchaseRecord.entity.js';
import { orm } from '../shared/orm.js';
import { coursePurchaseSchema } from '../schemas/coursePurchase.schema.js';
import { ZodError } from 'zod';

const em = orm.em;

em.getRepository(CoursePurchaseRecord);
function SanitizedInput(req: Request, res: Response, next: NextFunction) {
  // Creación de objeto con propiedades válidas
  req.body.sanitizedInput = {
    course: req.body.course,
    member: req.body.member,
    totalAmount: req.body.totalAmount,
  };

  // Eliminación de propiedades undefined
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function add(req: Request, res: Response) {
  try {
    const parsedData = coursePurchaseSchema.parse(req.body.sanitizedInput);
    const coursePurchaseRecord = em.create(CoursePurchaseRecord, parsedData);
    await em.flush();
    res.status(201).json({
      message: 'Course purchase record created',
      data: coursePurchaseRecord,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return (
        res
          .status(400)
          .json(error.issues.map((issue) => ({ message: issue.message })))
      );
    }
    console.log(error.issues);
    res.status(500).json({ message: error.message });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    res.json({ message: 'found all coursePurchaseRecords' });
    const coursePurchaseRecords = await em.find(
      CoursePurchaseRecord,
      {},
      { populate: ['course', 'member'] }
    );
    res.json({
      message: 'found all coursePurchaseRecords',
      data: coursePurchaseRecords,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const coursePurchaseRecord = await em.findOneOrFail(
      CoursePurchaseRecord,
      { id },
      { populate: ['course', 'member'] }
    );
    res.status(200).json({
      message: 'found coursePurchaseRecord',
      data: coursePurchaseRecord,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const coursePurchaseRecordToUpdate = await em.findOneOrFail(
      CoursePurchaseRecord,
      { id }
    );
    em.assign(coursePurchaseRecordToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({
      message: 'CoursePurchaseRecord updated',
      data: coursePurchaseRecordToUpdate,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const coursePurchaseRecord = em.getReference(CoursePurchaseRecord, id);
    await em.removeAndFlush(coursePurchaseRecord);
    res.status(204).json({ message: 'CoursePurchaseRecord deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  //res.status(500).json({ message: 'Not implemented' });
}

export { findAll, findOne, add, update, remove, SanitizedInput };
