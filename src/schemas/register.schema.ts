import { z } from 'zod';

const UserRole = z.enum(['admin', 'member']);

export const registerSchema = z.object({
  dni: z
    .number()
    .int()
    .min(10000000, 'DNI must be an 8-digit number')
    .max(99999999, 'DNI must be an 8-digit number'),
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
});
