import { Request, Response, NextFunction } from 'express';
import { Course } from '../entities/course.entity.js';
import { orm } from '../shared/orm.js';

import { courseSchema } from '../schemas/course.schema.js';
import { ZodError } from 'zod';

const em = orm.em;
em.getRepository(Course);
function sanitizeCourseInput(req: Request, res: Response, next: NextFunction) {
  // Creación de objeto con propiedades válidas
  req.body.sanitizedInput = {
    title: req.body.title,
    price: req.body.price,
    topics: req.body.topics,
    levels: req.body.levels,
  };

  // Eliminación de propiedades undefined
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function add(req: Request, res: Response) {
  try {
    const parsedData = courseSchema.parse(req.body.sanitizedInput);
    const course = em.create(Course, parsedData);
    await em.flush();
    res.status(201).json({ message: 'Course created', data: course });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message })));
    }
    res.status(500).json({ message: error.message });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const courses = await em.find(Course, {}, { populate: ['topics'] });
    res.json({ message: 'found all courses', data: courses });
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
      { populate: ['topics'] }
    );
    res.status(200).json({ message: 'found course', data: course });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const course = em.getReference(Course, id);
    em.assign(course, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Course updated', data: course });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const course = em.getReference(Course, id);
    await em.removeAndFlush(course);
    res.status(204).json({ message: 'Course deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove, sanitizeCourseInput };
