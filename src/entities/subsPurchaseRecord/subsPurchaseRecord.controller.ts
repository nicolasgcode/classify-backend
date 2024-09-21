import { Request, Response, NextFunction } from 'express';
import { SubsPurchaseRecord } from '../subsPurchaseRecord/subsPurchaseRecord.entity.js';
import { orm } from '../../shared/orm.js';

const em = orm.em;

em.getRepository(SubsPurchaseRecord);
function sanitizeSubsPurchaseRecordInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { totalAmount, subscription, user } = req.body;
  // Validación de tipos
  try {
    if (totalAmount !== Number) {
      req.body.totalAmount = parseInt(totalAmount);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid totalAmount' });
  }
  try {
    if (subscription !== Number) {
      req.body.subscription = parseInt(subscription);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid subscription' });
  }
  try {
    if (user !== Number) {
      req.body.user = parseInt(user);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid user' });
  }

  // Creación de objeto con propiedades válidas
  req.body.sanitizedInput = {
    totalAmount: req.body.totalAmount,
    subscription: req.body.subscription,
    user: req.body.user,
  };

  // Eliminación de propiedades undefined
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const subsPurchaseRecords = await em.find(
      SubsPurchaseRecord,
      {},
      { populate: ['subscription', 'member'] }
    );
    res.json({
      message: 'found all subsPurchaseRecords',
      data: subsPurchaseRecords,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const subsPurchaseRecord = await em.findOneOrFail(
      SubsPurchaseRecord,
      { id },
      { populate: ['subscription', 'member'] }
    );
    res
      .status(200)
      .json({ message: 'found subsPurchaseRecord', data: subsPurchaseRecord });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const subsPurchaseRecord = em.create(
      SubsPurchaseRecord,
      req.body.sanitizedInput
    );
    await em.flush();
    res.status(201).json({
      message: 'SubsPurchaseRecord created',
      data: subsPurchaseRecord,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const subsPurchaseRecordToUpdate = await em.findOneOrFail(
      SubsPurchaseRecord,
      { id }
    );
    em.assign(subsPurchaseRecordToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({
      message: 'SubsPurchaseRecord updated',
      data: subsPurchaseRecordToUpdate,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const subsPurchaseRecord = em.getReference(SubsPurchaseRecord, id);
    await em.removeAndFlush(subsPurchaseRecord);
    res.status(204).json({ message: 'SubsPurchaseRecord deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  //res.status(500).json({ message: 'Not implemented' });
}

export {
  findAll,
  findOne,
  add,
  update,
  remove,
  sanitizeSubsPurchaseRecordInput,
};
