import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
});

export function validateLogin(object: any) {
  try {
    return loginSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}
