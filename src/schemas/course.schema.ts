import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().min(1, 'Price is required'),
  topics: z.array(z.number().min(1, 'At least one topic is required')),
  levels: z.array(z.number().min(1, 'At least one level is required')),
});
