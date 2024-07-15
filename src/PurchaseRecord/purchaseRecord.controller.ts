import { Request, Response, NextFunction } from 'express';
import { PurchaseRecord } from './purchaseRecord.entity.js';
import {orm} from '../shared/orm.js';
import { Subscription } from '../subscription/subscription.entity.js';
import { User } from '../user/user.entity.js';


const em = orm.em;
em.getRepository(PurchaseRecord);
function sanitizeSubscriptionInput(req: Request, res: Response, next: NextFunction) {
  const { id, montoTotal, purchaseAt } = req.body;
  // Validación de tipos
  try {
    if (req.body.montoTotal !== undefined) {
      req.body.montoTotal = parseInt(req.body.montoTotal);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid montoTotal'});
  }
  try {
    if (req.body.purchaseAt !== undefined) {
      req.body.purchaseAt = new Date(req.body.purchaseAt);
    }else{
      req.body.purchaseAt = new Date();
    }
  } catch (error) {
      return res.status(400).send({ message: 'Invalid purchaseAt' });
  }
  try{  
    if (req.body.subscriptions[0] !== undefined) {
      req.body.subscriptions[0] = req.body.subscriptions[0].map((subscription:any) => {
        return em.getReference(Subscription, subscription.id);
      });
    }
  }catch (error) {
    return res.status(400).send({ message: 'Invalid subscriptions' });
  }
      
  // Creación de objeto con propiedades válidas
  req.body.sanitizedInput = {
    id: req.body.id,
    montoTotal: req.body.montoTotal,
    purchaseAt: req.body.purchaseAt,
    subscriptions: req.body.subscriptions,
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
    const purchaseRecord	 = em.create(PurchaseRecord, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'PurchaseRecord created', data: purchaseRecord }
    )}catch (error:any) {
      res.status(500).send({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const purchaseRecord = await em.findOneOrFail(PurchaseRecord, { id })
    em.assign(purchaseRecord, req.body)
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
