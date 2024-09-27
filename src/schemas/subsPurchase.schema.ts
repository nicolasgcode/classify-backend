import { z } from 'zod';

export const subsPurchaseSchema = z.object({
  subscription: z
    .number({ message: 'Invalid subscription' })
    .min(1, 'Subscription is required'),
  member: z
    .number({ message: 'Invalid subscription' })
    .min(1, 'Member is required'),
  totalAmount: z
    .number({ message: 'Invalid amount' })
    .min(1, 'Total amount is required'),
});
