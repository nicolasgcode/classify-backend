import { Request, Response, NextFunction } from 'express';
import { Course } from './../entities/course.entity.js';
import { Unit } from './../entities/unit.entity.js';
import { Topic } from './../entities/topic.entity.js';
import { orm } from './../shared/orm.js';
import {
  validateCourse,
  validateCourseToPatch,
} from './../schemas/course.schema.js';
import { ZodError } from 'zod';
import { CoursePurchaseRecord } from '../entities/coursePurchaseRecord.entity.js';

const em = orm.em;
em.getRepository(Course);

function sanitizeCourseInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    title: req.body.title,
    price: Number(req.body.price),
    level: req.body.level,
    topics: req.body.topics,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

function sanitizeSearchInput(req: Request) {
  const queryResult: any = {
    title: req.query.title,
  };

  Object.keys(queryResult).forEach((key) => {
    if (queryResult[key] === undefined) {
      delete queryResult[key];
    } else if (key === 'title') {
      queryResult[key] = { $like: `%${queryResult[key].trim()}%` };
    }
  });
  return queryResult;
}

async function findAll(req: Request, res: Response) {
  try {
    const sanitizedQuery = sanitizeSearchInput(req);

    const courses = await em.find(Course, sanitizedQuery, {
      populate: ['topics', 'units'],
    });

    res.status(200).json({ message: 'Found all courses', courses: courses });
  } catch (error: any) {
    res.status(500).json({ message: (error as any).message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const course = await em.findOneOrFail(
      Course,
      { id },
      { populate: ['topics', 'units'] }
    );
    res.status(200).json({ message: 'found course', course: course });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const validCourse = validateCourse(req.body.sanitizedInput);

    const course = em.create(Course, {
      ...validCourse,
      createdAt: new Date(),
      isActive: true,
    });

    await em.persistAndFlush(course);

    // const course = em.getReference(Course, course.id);

    res.status(201).json({
      message: 'Course created successfully',
      course: course,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message })));
    }
    res.status(500).send({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);

    const course = await em.findOne(Course, { id });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const courseUpdated =
      req.method === 'PATCH'
        ? validateCourseToPatch(req.body.sanitizedInput)
        : validateCourse(req.body.sanitizedInput);

    if (courseUpdated.topics && courseUpdated.topics.length > 0) {
      const topicsEntities = await em.find(Topic, {
        id: { $in: courseUpdated.topics },
      });

      if (topicsEntities.length !== courseUpdated.topics.length) {
        return res.status(400).json({
          message: 'Some topics could not be found in the database',
        });
      }

      course.topics.add(topicsEntities);
    }

    em.assign(course, courseUpdated);

    await em.flush();

    res.status(200).json({ message: 'Course updated', data: course });
  } catch (error: any) {
    const errorMessage = (error as any).message || 'Internal server error';
    res.status(500).json({ message: errorMessage });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const course = em.getReference(Course, id);
    const units = await em.find(Unit, { course });
    if (units.length > 0) {
      await em.removeAndFlush(units);
    }
    await em.removeAndFlush(course);
    res.status(204).json({ message: 'Course deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function addUnitToCourse(req: Request, res: Response) {
  const { courseId } = req.params;
  const { title, description, content } = req.body;

  try {
    // Buscar el curso y el nivel
    const course = await em.findOneOrFail(Course, { id: Number(courseId) });

    // Crear la unidad
    const newUnit = em.create(Unit, {
      title,
      description,
      content,
      course, // Asociamos la unidad al curso
    });

    // Persistir la unidad
    await em.persistAndFlush(newUnit);

    res.status(201).json({ message: 'Unit added successfully', unit: newUnit });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

const getUnitsByCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params; // Obtén el ID del curso de la URL

  try {
    // Encuentra el curso por ID
    const course = await em.findOneOrFail(Course, { id: Number(courseId) });

    // Recupera las unidades asociadas al curso
    const units = await em.find(Unit, { course: course }); // Asumiendo que `Unit` tiene una relación con `Course`

    // Si no hay unidades, devuelve un mensaje
    if (units.length === 0) {
      return res
        .status(404)
        .json({ message: 'No units found for this course' });
    }

    // Si se encuentran unidades, devuelvelas en la respuesta
    return res.status(200).json({ data: units });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error fetching units: ' + (error as Error).message });
  }
};

export {
  findAll,
  findOne,
  add,
  update,
  remove,
  sanitizeCourseInput,
  addUnitToCourse,
  getUnitsByCourse,
};
