import { Request, Response } from 'express';
import { Subscription } from '../entities/subscription.entity.js';
import { orm } from '../shared/orm.js';

const em = orm.em;

em.getRepository(Subscription);

export async function findAll(req: Request, res: Response) {
  try {
    const subscriptions = await em.find(Subscription, {});
    res.json({ message: 'found all subscriptions', data: subscriptions });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
