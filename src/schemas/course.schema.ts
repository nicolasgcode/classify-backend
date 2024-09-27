import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().min(1, 'Price is required'),
  topics: z.array(z.number().min(1, 'At least one topic is required')),
  levels: z.array(z.number().optional(), //La idea es que se cree el curso y despus de le añadan los levels
});
export type Course = z.infer<typeof CourseSchema>;

export const CourseToPatchSchema = z.object({
  title: z.string().optional(),
  price: z.number().optional(),
  topics: z.array(z.number().optional(),
  levels: z.array(z.number().optional(),
});

export type CourseToPatch = z.infer<typeof CourseToPatchSchema>;

export const SearchByTitleSchema = z.object({
   title: z.string().min(1, 'Title is required'),
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
