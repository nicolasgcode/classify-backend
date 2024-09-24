import { Request, Response, NextFunction } from "express";
import { Course } from "./course.entity.js";
import { orm } from "../../shared/orm.js";
import {
  validarCourseSchema,
  validarCourseToPatchSchema,
  validarSearchByTitleSchema,
} from "./course.schema.js";

const em = orm.em;
em.getRepository(Course);
function sanitizeCourseInput(req: Request, res: Response, next: NextFunction) {
  try {
    // Validamos el cuerpo de la solicitud con Zod
    req.body = validarCourseSchema(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Invalid course input", error: error.errors });
  }
}

// Middleware para validar datos de actualización de curso
function sanitizeCourseToPatchInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Validamos los campos de la solicitud para actualizar con Zod
    req.body = validarCourseToPatchSchema(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Invalid course patch input", error: error.errors });
  }
}

function sanitizeSearchInput(req: Request, res: Response, next: NextFunction) {
  try {
    req.query = validarSearchByTitleSchema(req.query);
    next();
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Invalid search input", error: error.errors });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const courses = await em.find(
      Course,
      {},
      { populate: ["topics", "levels"] }
    );
    res.json({ message: "found all courses", data: courses });
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
    const course = em.create(Course, req.body);
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
    em.assign(course, req.body);
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
  sanitizeCourseInput,
  sanitizeCourseToPatchInput,
  sanitizeSearchInput,
};
