import { z } from 'zod';

export const levelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  course: z.number().int().positive().min(1, 'Course is required'),
});
export type LevelToPatch = z.infer<typeof LevelToPatchSchema>;
export function validarLevelSchema(object:any) {
    try {
        return  LevelSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}
