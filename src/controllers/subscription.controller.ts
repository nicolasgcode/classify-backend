import { Request, Response, NextFunction } from 'express';
import { Subscription } from '../entities/subscription.entity.js';
import { orm } from '../shared/orm.js';
import { subscriptionSchema } from '../schemas/subscription.schema.js';
import { ZodError } from 'zod';

const em = orm.em;
em.getRepository(Subscription);
function sanitizedInput(req: Request, res: Response, next: NextFunction) {
  // Creación de objeto con propiedades válidas
  req.body.sanitizedInput = {
    description: req.body.description,
    duration: req.body.duration,
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

async function add(req: Request, res: Response) {
  try {
    const parsedData = subscriptionSchema.parse(req.body.sanitizedInput);
    const subscription = em.create(Subscription, parsedData);
    await em.flush();
    res
      .status(201)
      .json({ message: 'Subscription created', data: subscription });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return (
        res
          .status(400)
          // .json(error.issues.map((issue) => ({ message: issue.message })));
          .json(error.issues)
      );
    }
    res.status(500).json({ message: error.message });
  }
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

export { findAll, findOne, add, update, remove, sanitizedInput };
