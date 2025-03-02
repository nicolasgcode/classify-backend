import { z } from 'zod';

export const orderSchema = z.object({
  orderDate: z.date(),
  status: z.string().min(1),
  total: z.number().int().positive(),
  user: z.number().int().positive(),
  orderLines: z.array(
    z.object({
      orderDate: z.date(),
      course: z.number().int().positive(),
      subTotal: z.number().int().positive(),
      order: z.number().int().positive(),
    })
  ),
});
export function validateOrder(object: any) {
  try {
    return orderSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}
