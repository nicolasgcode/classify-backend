import { loginSchema } from '../schemas/auth.schema.js';
import { ZodError } from 'zod';
import { Request, Response } from 'express';

import { Member } from '../entities/member.entity.js';
import { orm } from '../shared/orm.js';

import jwt from 'jsonwebtoken';

const em = orm.em;

export const login = async (req: Request, res: Response) => {
  try {
    const user = loginSchema.parse(req.body);
    const { email, password } = user;
    const existingUser = await em.findOne(Member, { email });
    if (!existingUser) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Aquí debes comparar la contraseña. Asumiendo que tienes un método para hacerlo
    const isPasswordMatched = existingUser?.password === password;
    // Implementa esta función según tu lógica
    if (!isPasswordMatched) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const token = jwt.sign(
      { id: existingUser?.id, email: existingUser?.email },
      'YOUR_SECRET',
      {
        expiresIn: '1d',
      }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: 'login success',
      token: token,
    });

    console.log(existingUser);
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message })));
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};
