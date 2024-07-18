import { Request, Response, NextFunction } from 'express';
import { PurchaseRecord } from './purchaseRecord.entity.js';
import {orm} from '../shared/orm.js';

const em = orm.em;

em.getRepository(PurchaseRecord);
function sanitizeSubscriptionInput(req: Request, res: Response, next: NextFunction) {
  const { montoTotal, subscription, user  } = req.body;
  // Validación de tipos
  try {
    if (montoTotal !== undefined) {
      req.body.montoTotal = parseInt(montoTotal);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid montoTotal'});
  }
  /* try{  
    for (let i of req.body.subscriptions) {
      if (i !== undefined) {
        i = parseInt(i);
      }
    }
  }catch (error) {
    return res.status(400).send({ message: 'Invalid subscriptions' });
  } */
      
  // Creación de objeto con propiedades válidas
  req.body.sanitizedInput = {
    montoTotal: req.body.montoTotal,
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
    const purchaseRecords = await em.find(
      PurchaseRecord, 
      {},
      { populate: ['subscription',  'user'] })
    res.json({message: 'Finded all purchaseRecords', data: purchaseRecords })
  }catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const purchaseRecord = await em.findOneOrFail(
      PurchaseRecord, 
      { id },
      { populate: ['subscription', 'user'] })
    res.status(200).json({ message: 'Finded purchaseRecord', data: purchaseRecord })
  }catch (error:any) {  
    res.status(500).json({ message: error.message })
  }
} 

/* 
async function findSubscriptionById(ids: number[]): Promise<Subscription[]> { 
  let subscriptions: Subscription[] = [];
  for (const id of ids) {
    if (id !== undefined) {
      subscriptions.push(await em.findOneOrFail(Subscription, { id }));
      };
    }
  return subscriptions;
}
 */
async function add(req: Request, res: Response) {
  try{
    const purchaseRecord	 = em.create(PurchaseRecord, req.body)
    //req.body.subscriptions = await findSubscriptionById(req.body.subscriptions);
    await em.flush()
    res.status(201).json({ message: 'PurchaseRecord created', data: purchaseRecord }
    )
    }catch (error:any) {
      res.status(500).json({ message: error.message })
  }

}

async function update(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const purchaseRecordToUpdate = await em.findOneOrFail(PurchaseRecord, { id })
    em.assign(purchaseRecordToUpdate, req.body.sanitizedInput)
    await em.flush();
    res.status(200).json({ message: 'PurchaseRecord updated', data: purchaseRecordToUpdate });
  }catch (error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const purchaseRecord = em.getReference(PurchaseRecord, id);
    await em.removeAndFlush(purchaseRecord)
    res.status(204).json({ message: 'PurchaseRecord deleted' });
  }catch (error:any) {
    res.status(500).json({ message: error.message })
  }
  //res.status(500).json({ message: 'Not implemented' });
}

export {findAll, findOne, add, update, remove };
