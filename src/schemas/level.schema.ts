import { z } from "zod";

export const levelSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters")
    .regex(
      /^[A-Za-z0-9\s.,-]+$/,
      "Name can only contain letters, numbers, spaces, and certain symbols (.,-)"
    ),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must not exceed 500 characters"),
  course: z.number().int().positive().min(1, "Course is required"),
});

export function validateLevel(object: any) {
  try {
    return levelSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}

export const levelToPatch = z.object({
  name: z
    .string()
    .max(20, "Name must not exceed 100 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
    .optional(),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  course: z.number().int().positive().optional(),
});

export function validarLevelToPatch(object: any) {
  try {
    return levelToPatch.parse(object);
  } catch (error: any) {
    throw error;
  }
}
