import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/user.entity.js';
import { orm } from '../shared/orm.js';
import { validateUser, validateUserToPatch } from '../schemas/user.schema.js';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';

const em = orm.em;
em.getRepository(User);
function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    dni: req.body.dni,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const users = await em.find(
      User,
      {},
      { populate: ['orders.orderLines.course'] }
    );
    res.status(200).json({ message: 'found all users', users: users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserCourses(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(User, id, {
      populate: [
        'orders.orderLines.course',
        'orders.orderLines.course.title',
        'orders.orderLines.course.topics',
        'orders.orderLines.course.level',
      ],
    });

    const courses = user.orders
      .getItems()
      .flatMap((order) =>
        order.orderLines.getItems().map((orderLine) => orderLine.course)
      );

    res.status(200).json({
      message: `Found ${user.name}'s courses`,
      courses: courses,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(User, id, {
      populate: ['orders.orderLines.course'],
    });
    res.status(200).json({ message: 'found user', user: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function add(req: Request, res: Response) {
  try {
    const validUser = validateUser(req.body.sanitizedInput);
    const emailAlreadyInUse = await em.findOne(User, {
      email: validUser.email,
    });
    if (emailAlreadyInUse) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(validUser.password, 10);
    const user = em.create(User, {
      ...validUser,
      password: hashedPassword,
    });
    await em.flush();
    const userCreated = em.getReference(User, user.id);
    res.status(201).json({ message: 'user created', data: { userCreated } });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message })));
    }
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(User, id);
    const userToUpdate =
      req.method === 'PATCH'
        ? validateUserToPatch(req.body.sanitizedInput)
        : validateUser(req.body.sanitizedInput);
    em.assign(user, userToUpdate);
    await em.flush();
    res.status(200).json({ message: 'user updated', data: userToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = em.getReference(User, id);
    await em.removeAndFlush(user);
    res.status(204).json({ message: 'User deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  sanitizeUserInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  getUserCourses,
};
