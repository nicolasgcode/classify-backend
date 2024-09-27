import { z } from 'zod';

export const unitSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  number: z.number().min(1, 'Number is required'),
  level: z.number().min(1, 'Unit is required'),
});
