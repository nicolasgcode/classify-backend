import e from 'express';
import {z} from 'zod';

export const MemberSchema = z.object({
  id: z.number().int().positive().optional(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  //role: z.string(),
});

export type Member = z.infer<typeof MemberSchema>;

export const MemberToPatchSchema = z.object({
    id: z.number().int().positive().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    name: z.string().optional(),
    //role: z.string().optional(),
    });

export type MemberToPatch = z.infer<typeof MemberToPatchSchema>;

function validarMemberSchema(object:any) {
    try {
        return  MemberSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}
export {validarMemberSchema}