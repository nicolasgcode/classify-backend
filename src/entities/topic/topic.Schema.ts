import {z} from 'zod';

export const topicSchema = z.object({
    id: z.number().int().positive(),
    description: z.string(),
});

export type Topic = z.infer<typeof topicSchema>;

export const topicToPatchSchema = z.object({
    id: z.number().int().positive().optional(),
    description: z.string().optional(),
    });

export type TopicToPatch = z.infer<typeof topicToPatchSchema>;

function validarTopicSchema(object:any) {
    try {
        return  topicSchema.parse(object);
    } catch (error:any) {  
        throw error
    }
}

export {validarTopicSchema}

