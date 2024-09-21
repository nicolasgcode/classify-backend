import {number, z} from 'zod';

export const UnitSchema = z.object({
    name: z.string(),
    number: z.number().int().positive(),
});

export type Unit = z.infer<typeof UnitSchema>;

export const UnitToPatchSchema = z.object({
    name: z.string().optional(),
    number: z.number().int().positive().optional(),
    });

export type UnitToPatch = z.infer<typeof UnitToPatchSchema>;


function validarUnitSchema(object:any) {
    try {
        return  UnitSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}

export {validarUnitSchema}

