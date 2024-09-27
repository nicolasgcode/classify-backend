import { loginSchema } from '../schemas/auth.schema.js';
import { ZodError } from 'zod';
import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  try {
    const result = loginSchema.parse(req.body);

    console.log(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message })));
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};
