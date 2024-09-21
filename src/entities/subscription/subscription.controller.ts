import { Request, Response, NextFunction } from 'express';
import { Subscription } from '../subscription/subscription.entity.js';
import { orm } from '../../shared/orm.js';

const em = orm.em;
em.getRepository(Subscription);
function sanitizeSubscriptionInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, duration, price } = req.body;
  // Validación de tipos
  try {
    if (req.body.duration !== undefined) {
      req.body.duration = parseInt(req.body.duration);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid duration' });
  }
  try {
    if (req.body.price !== undefined) {
      req.body.price = parseInt(req.body.price);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid price' });
  }

  // Creación de objeto con propiedades válidas
  req.body.sanitizedInput = {
    id: req.body.id,
    dateStart: req.body.dateStart,
    price: req.body.price,
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
    const subscriptions = await em.find(Subscription, {});
    res.json({ message: 'found all subscriptions', data: subscriptions });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const subscription = await em.findOneOrFail(Subscription, { id });
    res.status(200).json({ message: 'found subscription', data: subscription });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const subscription = em.create(Subscription, req.body);
    await em.flush();
    res
      .status(201)
      .json({ message: 'Subscription created', data: subscription });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const subscription = em.getReference(Subscription, id);
    em.assign(subscription, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Subscription updated', data: subscription });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const subscription = em.getReference(Subscription, id);
    await em.removeAndFlush(subscription);
    res.status(204).json({ message: 'Subscription deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove };
