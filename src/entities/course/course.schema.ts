import { z } from "zod";

export const CourseSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  description: z.string(),
  duration: z.number(),
});

export type Course = z.infer<typeof CourseSchema>;

export const CourseToPatchSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    duration: z.number().optional(),
    });

export type CourseToPatch = z.infer<typeof CourseToPatchSchema>;

function validarCourseSchema(object: any) {
  try {
    return CourseSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}

export { validarCourseSchema };


