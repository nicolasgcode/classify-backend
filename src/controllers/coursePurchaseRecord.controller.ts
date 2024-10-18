import { Request, Response, NextFunction } from "express";
import { CoursePurchaseRecord } from "../entities/coursePurchaseRecord.entity.js";
import { Course } from "../entities/course.entity.js";
import { orm } from "../shared/orm.js";
import {
  validateCoursePurchaseRecord,
  validateCoursePurchaseRecordToPatch,
} from "../schemas/coursePurchase.schema.js";
import { getErrorMap, ZodError } from "zod";
import { getRandomValues } from "crypto";

const em = orm.em;
em.getRepository(CoursePurchaseRecord);
em.getRepository(Course);

function SanitizedInput(req: Request, res: Response, next: NextFunction) {
  // Creación de objeto con propiedades válidas
  req.body.sanitizedInput = {
    course: req.body.course,
    user: req.body.user,
  };

  // Eliminación de propiedades undefined
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    res.json({ message: "found all coursePurchaseRecords" });
    const coursePurchaseRecords = await em.find(
      CoursePurchaseRecord,
      {},
      { populate: ["course", "user"] }
    );
    res.json({
      message: "found all coursePurchaseRecords",
      data: coursePurchaseRecords,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const coursePurchaseRecord = await em.findOneOrFail(
      CoursePurchaseRecord,
      { id },
      { populate: ["course", "user"] }
    );
    res.status(200).json({
      message: "found coursePurchaseRecord",
      data: coursePurchaseRecord,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
async function add(req: Request, res: Response) {
  try {
    const validCoursePurchaseRecord = validateCoursePurchaseRecord(
      req.body.sanitizedInput
    );
    const course = em.getReference(Course, validCoursePurchaseRecord.course);
    const coursePurchaseRecord = em.create(CoursePurchaseRecord, {
      ...validCoursePurchaseRecord,
      totalAmount: course.price,
      purchaseAt: new Date(),
    });
    await em.flush();
    res.status(201).json({
      message: "Course purchase record created",
      data: coursePurchaseRecord,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message })));
    }
    console.log(error.issues);
    res.status(500).json({ message: error.message });
  }
}
//El update y el remove no serian necesarios
/* 
async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const coursePurchaseRecord = em.getReference(CoursePurchaseRecord, id);
    const validCoursePurchaseRecord =
      req.method === "PATCH"
        ? validateCoursePurchaseRecordToPatch(req.body.sanitizedInput)
        : validateCoursePurchaseRecord(req.body.sanitizedInput);
    if (coursePurchaseRecord.course) {
      const course = em.getReference(Course, coursePurchaseRecord.course.id);
      coursePurchaseRecord.totalAmount = course.price;
    }
    em.assign(coursePurchaseRecord, validCoursePurchaseRecord);
    await em.flush();
    res.status(200).json({
      message: "CoursePurchaseRecord updated",
      data: validCoursePurchaseRecord,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const coursePurchaseRecord = em.getReference(CoursePurchaseRecord, id);
    await em.removeAndFlush(coursePurchaseRecord);
    res.status(204).json({ message: "CoursePurchaseRecord deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  //res.status(500).json({ message: 'Not implemented' });
}
 */
//export { update, remove };
export { findAll, findOne, add, SanitizedInput };
