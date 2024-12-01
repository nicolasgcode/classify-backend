import { loginSchema } from '../schemas/auth.schema.js';
import { ZodError } from 'zod';
import { Request, Response } from 'express';

import { User } from '../entities/user.entity.js';
import { orm } from '../shared/orm.js';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

const em = orm.em;

export const login = async (req: Request, res: Response) => {
  try {
    const user = loginSchema.parse(req.body);
    const { email, password } = user;
    const existingUser = await em.findOne(User, { email });

    if (!existingUser) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const token = jwt.sign(
      {
        id: existingUser?.id,
        email: existingUser?.email,
        admin: existingUser?.admin,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: 'login success',
      token: token,
      admin: existingUser?.admin,
    });

    console.log(existingUser);
    console.log(token);
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message })));
    }
    return res.status(500).json(console.log(error));
  }
};
