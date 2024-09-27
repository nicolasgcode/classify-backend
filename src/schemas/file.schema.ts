import { z } from 'zod';

export const fileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  unit: z.number().min(1, 'Unit is required'),
});
