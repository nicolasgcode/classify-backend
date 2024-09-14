import { Request, Response, NextFunction } from 'express';
import { Admin } from '../entities/admin.entity.js';
import { orm } from '../shared/orm.js';

const em = orm.em;

function sanitizeAdminInput(req: Request, res: Response, next: NextFunction) {
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
    const admins = await em.find(Admin, {});
    res.status(200).json({ message: 'found all admins', data: admins });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const admin = await em.findOneOrFail(Admin, { id });
    res.status(200).json({ message: 'found admin', data: admin });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const admin = em.create(Admin, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'admin created', data: admin });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const adminToUpdate = await em.findOneOrFail(Admin, { id });
    em.assign(adminToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'admin updated', data: adminToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const admin = em.getReference(Admin, id);
    await em.removeAndFlush(admin);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeAdminInput, findAll, findOne, add, update, remove };
