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

export const SearchByTitleSchema = z.object({
  description: z.string().min(1, "Description must not be empty"),
});

export type SearchByDescription = z.infer<typeof SearchByTitleSchema>;

function validarCourseSchema(object: any) {
  try {
    return CourseSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}

function validarCourseToPatchSchema(object: any) {
  try {
    return CourseToPatchSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}

function validarSearchByTitleSchema(object: any) {
  try {
    return SearchByTitleSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}
export {
  validarCourseSchema,
  validarCourseToPatchSchema,
  validarSearchByTitleSchema,
};
