import {z} from 'zod';

export const subscriptionSchema = z.object({
    id: z.number().int().positive().optional(),
    userId: z.number().int().positive(),
    startDate: z.string(),
});

export type Subscription = z.infer<typeof subscriptionSchema>;

export const subscriptionToPatchSchema = z.object({
    id: z.number().int().positive().optional(),
    userId: z.number().int().positive().optional(),
    startDate: z.string().optional(),
    }); 

export type SubscriptionToPatch = z.infer<typeof subscriptionToPatchSchema>;

function validarSubscriptionSchema(object:any) {
    try {
        return  subscriptionSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}

export {validarSubscriptionSchema}