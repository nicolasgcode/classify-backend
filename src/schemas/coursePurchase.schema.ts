import { z } from 'zod';

export const coursePurchaseSchema = z.object({
  course: z.number().min(1, 'Course id is required'),
  member: z.number().min(1, 'Member id is required'),
  totalAmount: z.number().min(1, 'totalAmount id is required'),
});
