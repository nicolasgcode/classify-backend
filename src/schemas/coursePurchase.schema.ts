import { z } from 'zod';

export const coursePurchaseSchema = z.object({
  course: z.number().min(1, 'Course is required'),
  member: z.number().min(1, 'Member is required'),
  totalAmount: z.number().min(1, 'totalAmount is required'),
});
export type CoursePurchaseRecord = z.infer<typeof CoursePurchaseRecordSchema>;

export function validarCoursePurchaseRecordSchema(object:any) {
    try {
        return  CoursePurchaseRecordSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}
