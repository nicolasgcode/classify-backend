import { Request, Response, NextFunction } from 'express';
import { Member } from '../entities/member.entity.js';
import { orm } from '../shared/orm.js';

const em = orm.em;

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    dni: req.body.dni,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const members = await em.find(
      Member,
      {},
      { populate: ['subsPurchaseRecords', 'coursePurchaseRecords'] }
    );
    res.status(200).json({ message: 'found all members', data: members });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const member = await em.findOneOrFail(Member, { id });
    res.status(200).json({ message: 'found member', data: member });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const member = em.create(Member, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'member created', data: member });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const memberToUpdate = await em.findOneOrFail(Member, { id });
    em.assign(memberToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'member updated', data: memberToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const member = em.getReference(Member, id);
    await em.removeAndFlush(member);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeUserInput, findAll, findOne, add, update, remove };
