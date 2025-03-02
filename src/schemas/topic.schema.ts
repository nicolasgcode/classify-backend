import { z } from 'zod';

const topicSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

export function validateTopic(object: any) {
  try {
    return topicSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}
