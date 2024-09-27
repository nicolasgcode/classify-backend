import { z } from 'zod';

export const registerSchema = z.object({
  dni: z.number().min(8, 'Invalid dni'),
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
});
