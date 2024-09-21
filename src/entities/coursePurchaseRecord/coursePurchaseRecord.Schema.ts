import {z} from 'zod';


export const CoursePurchaseRecordSchema = z.object({
  id: z.number().int().positive(),
  courseId: z.number().int().positive(),
  userId: z.number().int().positive(),
  purchaseDate: z.string(),
});

export type CoursePurchaseRecord = z.infer<typeof CoursePurchaseRecordSchema>;

export const CourseToPatchSchema = z.object({
  id: z.number().int().positive().optional(),
  courseId: z.number().int().positive(),
  userId: z.number().int().positive(),
  purchaseDate: z.string(),
});
 
export type CoursePurchaserecordToPatch = z.infer<typeof CourseToPatchSchema>;

function validarCoursePurchaseRecordSchema(object:any) {
    try {
        return  CoursePurchaseRecordSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}

export {validarCoursePurchaseRecordSchema}


