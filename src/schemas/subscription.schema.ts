import { z } from 'zod';

export const subscriptionSchema = z.object({
  description: z
    .string({ message: 'Invalid description' })
    .min(1, 'Description is required'),
  duration: z
    .number({ message: 'Invalid duration' })
    .min(1, 'Duration is required'),
  price: z.number({ message: 'Invalid price' }).min(1, 'Price is required'),
});
