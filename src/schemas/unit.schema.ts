import { z } from 'zod';

const unitSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must not exceed 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description must not exceed 500 characters'),

  content: z
    .string()
    .min(1, 'Content is required')
    .max(10000, 'Content must not exceed 10000 characters'),

  course: z.number().int().positive(),
});

export const unitToPatch = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must not exceed 100 characters')
    .regex(
      /^[A-Za-z0-9\s.,-]+$/,
      'Name can only contain letters, numbers, spaces, and certain symbols (.,-)'
    )
    .optional(),

  description: z.string().min(1, 'Description is required').optional(),
  content: z.string().min(1, 'Content is required').optional(),
});

export function validateUnit(object: any) {
  try {
    return unitSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}

export function validarUnitToPatch(object: any) {
  try {
    return unitToPatch.parse(object);
  } catch (error: any) {
    throw error;
  }
}
