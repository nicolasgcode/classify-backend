import { z } from 'zod';

export const unitSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required') // El título es obligatorio
    .max(100, 'Title must not exceed 100 characters'), // El título no puede exceder 100 caracteres // Regex para permitir solo caracteres alfanuméricos y algunos símbolos
  description: z
    .string()
    .min(1, 'Description is required') // La descripción es obligatoria
    .max(500, 'Description must not exceed 500 characters'), // La descripción no puede exceder 500 caracteres

  content: z
    .string()
    .min(1, 'Content is required') // El contenido es obligatorio
    .max(10000, 'Content must not exceed 10000 characters'),

  course: z.number().int().positive(), // El nivel es obligatorio y debe ser un número entero positivo
});
export function validateUnit(object: any) {
  try {
    return unitSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}

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
  course: z.number().positive().int(),
});

export function validarUnitToPatch(object: any) {
  try {
    return unitToPatch.parse(object);
  } catch (error: any) {
    throw error;
  }
}
