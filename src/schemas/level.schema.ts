import { z } from "zod";

export const levelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  course: z.number().int().positive().min(1, "Course is required"),
  units: z.array(z.number()).optional(),
});

export function validarLevel(object: any) {
  try {
    return levelSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}

export const levelToPatch = z.object({
  name: z.string().optional(),
  course: z.number().int().positive().min(1, "Course is required").optional(),
  units: z.array(z.number()).optional(),
});

export function validarLevelToPatch(object: any) {
  try {
    return levelToPatch.parse(object);
  } catch (error: any) {
    throw error;
  }
}
