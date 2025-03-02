import { z } from 'zod';

const fileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  unit: z.number().min(1, 'Unit is required'),
});

export function validateFile(object: any) {
  try {
    return fileSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}
