import { Request, Response, NextFunction } from 'express';
import { PurchaseRecord } from './purchaseRecord.entity.js';
import {orm} from '../shared/orm.js';

const em = orm.em;
em.getRepository(PurchaseRecord);

async function findAll(req: Request, res: Response) {
  try {
    const purchaseRecords = await em.find(PurchaseRecord, {});
    res.json({message: 'Finded all purchaseRecords', data: purchaseRecords });
  }catch (error:any) {
    res.status(500).json({ message: 'Error finding purchaseRecords' });
  }
  //res.status(500).json({ message: 'Not implemented' });
  //res.json({ data: repository.findAll() });
}


async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const purchaseRecord = await em.findOneOrFail(PurchaseRecord, { id })
    res
      .status(200)
      .json({ message: 'Finded purchaseRecord', data: purchaseRecord })
  }catch (error:any) {  
    res.status(500).send({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try{
    const purchaseRecord	 = em.create(PurchaseRecord, req.body)
    await em.flush()
    res.status(201).json({ message: 'PurchaseRecord created', data: purchaseRecord }
    )}catch (error:any) {
      res.status(500).send({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const purchaseRecord = em.getReference(PurchaseRecord, id);
    em.assign(purchaseRecord, req.body);
    await em.flush();
    res.status(200).json({ message: 'PurchaseRecord updated', data: purchaseRecord });
  }catch (error:any) {
    res.status(500).send({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const purchaseRecord = em.getReference(PurchaseRecord, id);
    await em.removeAndFlush(purchaseRecord)
    res.status(204).json({ message: 'PurchaseRecord deleted' });
  }catch (error:any) {
    res.status(500).send({ message: error.message })
  }
  //res.status(500).json({ message: 'Not implemented' });
}

export {findAll, findOne, add, update, remove };
