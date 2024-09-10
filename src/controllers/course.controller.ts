import { Request, Response, NextFunction } from 'express';
import { Course } from '../entities/course.entity.js';
import { orm } from '../shared/orm.js';

const em = orm.em;
em.getRepository(Course);
function sanitizeCourseInput(req: Request, res: Response, next: NextFunction) {
  const { title, price, topics } = req.body;
  // Validación de tipos
  try {
    if (title !== undefined) {
      req.body.title = title.toString();
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid title' });
  }
  try {
    if (price !== undefined) {
      req.body.price = parseInt(price);
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid price' });
  }
  /*   try {
    for (let topic of topics) {
      if (topic !== Number) {
        topic = parseInt(topic);
      }
    }
    req.body.topics = topics;
  }catch (error) {
    return res.status(400).send({ message: 'Invalid topics' });
  } */

  // Creación de objeto con propiedades válidas
  req.body.sanitizedInput = {
    title: req.body.title,
    price: req.body.price,
    topics: req.body.topics,
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

async function add(req: Request, res: Response) {
  try {
    const course = em.create(Course, req.body);
    await em.flush();
    res.status(201).json({ message: 'Course created', data: course });
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
