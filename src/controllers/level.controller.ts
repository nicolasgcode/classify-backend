import { Request, Response, NextFunction } from 'express';
import { Level } from '../entities/level.entity.js';
import { orm } from '../shared/orm.js';
import { EntityManager } from '@mikro-orm/core';

const em: EntityManager = orm.em.fork();
em.getRepository(Level);

function sanitizeSearchInput(req: Request) {
  const queryResult: any = {
    course: req.query.course,
    order: req.query.order,
  };

  // Eliminar keys indefinidos y sanitizar el título
  Object.keys(queryResult).forEach((key) => {
    if (queryResult[key] === undefined) {
      delete queryResult[key];
    } else if (key === 'title') {
      queryResult[key] = { $like: `%${queryResult[key].trim()}%` }; // Sanitizar y preparar para consulta
    }
  });

  return queryResult;
}
async function findAll(req: Request, res: Response) {
  try {
    const sanitizedQuery = sanitizeSearchInput(req);
    const levels = await em.find(Level, sanitizedQuery, {
      populate: ['units'],
    });
    res.json({ message: 'found all levels', data: levels });
  } catch (error: any) {
    res.status(500).json({ message: 'Error finding Levels' });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const level = await em.findOneOrFail(
      Level,
      { id },
      { populate: ['units', 'courses'] }
    );
    res.status(200).json({ message: 'found level', data: level });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}

export { findAll, findOne };
