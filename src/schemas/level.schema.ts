import { z } from 'zod';

export const levelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  course: z.number().int().positive().min(1, 'Course is required'),
});
export type Level = z.infer<typeof levelSchema>;

export function validarLevelSchema(object:any) {
    try {
        return  levelSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}

export const levelToPatchSchema = z.object({
  name: z.string().opcional(),
  course: z.number().int().positive().min(1, 'Course is required').opcional(),
});

function validarLevelToPatchSchema(object:any) {
    try {
        return  levelToPatchSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}
export type levelToPatch = z.infer<typeof levelToPatchSchema>;
