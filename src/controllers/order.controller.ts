import { Request, Response, NextFunction } from 'express';
import { Order } from '../entities/order.entity.js';
import { orm } from '../shared/orm.js';
import { EntityManager } from '@mikro-orm/core';

const em: EntityManager = orm.em.fork();

em.getRepository(Order);

export async function findAll(req: Request, res: Response) {
  try {
    const units = await em.find(
      Order,
      {},
      {
        populate: ['orderLines'],
      }
    );
    res.status(200).json({ message: 'found all units', data: units });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
