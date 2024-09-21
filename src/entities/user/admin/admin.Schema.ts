import {z} from 'zod';  

export const AdminSchema = z.object({
    id: z.number().int().positive(),
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
    //role: z.string(),
});

export type Admin = z.infer<typeof AdminSchema>;

export const adminToPatchSchema = z.object({
    id: z.number().int().positive().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    name: z.string().optional(),
    //role: z.string().optional(),
    });

export type AdminToPatch = z.infer<typeof adminToPatchSchema>;

function validarAdminSchema(object:any) {
    try {
        return  AdminSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}

export {validarAdminSchema}
