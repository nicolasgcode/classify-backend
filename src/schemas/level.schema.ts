import { z } from 'zod';

export const levelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});
