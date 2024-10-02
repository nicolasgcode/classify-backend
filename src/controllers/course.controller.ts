import { Request, Response, NextFunction } from "express";
import { Course } from "./../entities/course.entity.js";
import { orm } from "./../shared/orm.js";
import {
  validateCourse,
  validateCourseToPatch,
  validateSearchByTitle,
} from "./../schemas/course.schema.js";

const em = orm.em;
em.getRepository(Course);
function sanitizeCourseInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    createAt: req.body.createAt,
    title: req.body.title,
    price: req.body.price,
    topics: req.body.topics,
    levels: req.body.levels,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const courses = validateCourse(
      await em.find(Course, {}, { populate: ["topics", "levels"] })
    );
    res.status(200).json({ message: "found all courses", data: courses });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const course = await em.findOneOrFail(
      Course,
      { id },
      { populate: ["topics", "levels"] }
    );
    res.status(200).json({ message: "found course", data: course });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const validCourse = validateCourse(req.body);
    const course = em.create(Course, validCourse);
    await em.flush();
    res.status(201).json({ message: "Course created", data: course });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const course = em.getReference(Course, id);
    let courseUpdated
    if (req.method === "PATCH") {
      courseUpdated = validateCourseToPatch(req.body.sanitizedInput);
    } else {
      courseUpdated = validateCourse(req.body.sanitizedInput);
    }
    em.assign(course, courseUpdated);
    await em.flush();
    res.status(200).json({ message: "Course updated", data: course });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const course = em.getReference(Course, id);
    await em.removeAndFlush(course);
    res.status(204).json({ message: "Course deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findBytitle(req: Request, res: Response) {
  try {
    const title = req.query.title as string;
    const courses = await em.find(
      Course,
      { title: { $like: `%${title}%` } },
      { populate: ["topics", "levels"] }
    );

    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found with the given title" });
    }

    res.json({ message: "Found courses", data: courses });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  findAll,
  findOne,
  add,
  update,
  remove,
  findBytitle,
  sanitizeCourseInput
};
