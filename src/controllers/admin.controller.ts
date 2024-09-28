import { Request, Response, NextFunction } from 'express';
import { Admin } from '../entities/admin.entity.js';
import { orm } from '../shared/orm.js';
import { ZodError } from 'zod';
import { registerSchema } from '../schemas/register.schema.js';
import bcrypt from 'bcrypt';
import { UserRole } from '../utils/UserRole.js';

const em = orm.em;

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    dni: req.body.dni,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const users = await em.find(Admin, {});
    res.status(200).json({ message: 'found all admins', data: users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(Admin, { id });
    res.status(200).json({ message: 'found user', data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const parsedData = registerSchema.parse(req.body.sanitizedInput);

    const existingAdmin = await em.findOne(Admin, { email: parsedData.email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Email ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(parsedData.password, 10);
    const admin = em.create(Admin, {
      ...parsedData,
      role: UserRole.ADMIN,
      password: hashedPassword,
    });
    await em.flush();
    res.status(201).json({ message: 'admin creado', data: admin });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json(error.issues);
    }
    res.status(500).json({ message: error.message });
  }
}
async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const userToUpdate = await em.findOneOrFail(Admin, { id });
    em.assign(userToUpdate, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'user updated', data: userToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = em.getReference(Admin, id);
    await em.removeAndFlush(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizeUserInput, findAll, findOne, add, update, remove };
