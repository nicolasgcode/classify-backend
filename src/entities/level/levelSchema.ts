import e from 'express';
import {z} from 'zod';

export const LevelSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  courseId: z.number().int().positive(),
  duration: z.number(),
  content: z.string(),
  order: z.number(),
});

export type Level = z.infer<typeof LevelSchema>;

export const LevelToPatchSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().optional(),
    courseId: z.number().int().positive().optional(),
    duration: z.number().optional(),
    content: z.string().optional(),
    order: z.number().optional(),
    });

export type LevelToPatch = z.infer<typeof LevelToPatchSchema>;

function validarLevelSchema(object:any) {
    try {
        return  LevelSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}

export {validarLevelSchema}

