import {z} from 'zod';

export const SubsPurchaseRecordSchema = z.object({
    id: z.number().int().positive().optional(),
    totalAmount: z.number().positive(),
    userId: z.number().int().positive().optional(),
});

export type SubsPurchaseRecord = z.infer<typeof SubsPurchaseRecordSchema>;

export const SubsPurchaseRecordToPatchSchema = z.object({
    id: z.number().int().positive().optional(),
    totalAmount: z.number().positive().optional(),
    userId: z.number().int().positive().optional(),
    });

export type SubsPurchaseRecordToPatch = z.infer<typeof SubsPurchaseRecordToPatchSchema>;

function validarSubsPurchaseRecordSchema(object:any) {
    try {
        return  SubsPurchaseRecordSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}

export {validarSubsPurchaseRecordSchema}
