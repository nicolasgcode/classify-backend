import { z } from 'zod';

export const topicSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});
