import { z } from "zod";

const coursePurchaseSchema = z.object({
  course: z.number().min(1, "Course is required"),
  user: z.number().min(1, "User is required"),
});

function validateCoursePurchaseRecord(object: any) {
  try {
    return coursePurchaseSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}
const coursePurchaseToPatchSchema = z.object({
  course: z.number().optional(),
  user: z.number().optional(),
});

function validateCoursePurchaseRecordToPatch(object: any) {
  try {
    return coursePurchaseToPatchSchema.parse(object);
  } catch (error: any) {
    throw error;
  }
}
export { validateCoursePurchaseRecordToPatch, validateCoursePurchaseRecord };
