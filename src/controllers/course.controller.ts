import { Request, Response, NextFunction } from 'express';
import { Course } from './../entities/course.entity.js';
import { Level } from './../entities/level.entity.js';
import { Unit } from './../entities/unit.entity.js';
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
    topics: req.body.topics,
    levelIds: req.body.levelIds,
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

  // Eliminar keys indefinidos y sanitizar el título
  Object.keys(queryResult).forEach((key) => {
    if (queryResult[key] === undefined) {
      delete queryResult[key];
    } else if (key === 'title') {
      queryResult[key] = { $like: `%${queryResult[key].trim()}%` }; // Sanitizar y preparar para consulta
    }
  });

  return queryResult;
}

async function findAll(req: Request, res: Response) {
  try {
    const sanitizedQuery = sanitizeSearchInput(req);

    const courses = await em.find(
      Course,
      sanitizedQuery, // Pasa sanitizedQuery directamente
      { populate: ['topics', 'levels', 'levels.units'] }
    );

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
      { populate: ['topics', 'levels'] }
    );
    res.status(200).json({ message: 'found course', course: course });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    // Validación de datos del curso (título, precio, tópicos)
    const validCourse = validateCourse(req.body.sanitizedInput);

    // Obtener los niveles del cuerpo de la solicitud
    const { levelIds } = req.body;

    // Validar que los niveles sean proporcionados y sean un array
    if (!Array.isArray(levelIds) || levelIds.length === 0) {
      return res
        .status(400)
        .json({ message: 'You must provide an array of level IDs.' });
    }

    // Verificar que los niveles proporcionados existen en la base de datos
    const levels = await em.find(Level, { id: { $in: levelIds } });

    if (levels.length !== levelIds.length) {
      return res
        .status(404)
        .json({ message: 'Some of the provided level IDs are invalid.' });
    }

    // Crear el curso
    const course = em.create(Course, {
      ...validCourse,
      createdAt: new Date(),
      isActive: true,
    });

    // Persistir el curso
    await em.persistAndFlush(course);

    // Asociar los niveles al curso
    course.levels.add(levels); // Asociamos los niveles validados

    // Persistir los cambios en la relación
    await em.flush();

    // Obtener la referencia al curso creado
    const courseCreated = em.getReference(Course, course.id);

    res.status(201).json({
      message: 'Course created successfully',
      course: { courseCreated },
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
    const course = em.getReference(Course, id);
    const courseUpdated =
      req.method === 'PATCH'
        ? validateCourseToPatch(req.body.sanitizedInput)
        : validateCourse(req.body.sanitizedInput);
    em.assign(course, courseUpdated);
    await em.flush();
    res.status(200).json({ message: 'Course updated', data: course });
  } catch (error: any) {
    const errorMessage = (error as any).message;
    res.status(500).json({ message: errorMessage });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const course = em.getReference(Course, id);
    const purchaseRecordCount = await em.count(CoursePurchaseRecord, {
      course,
    });
    if (purchaseRecordCount > 0) {
      course.isActive = false;
      await em.flush();
      return res.status(200).json({ message: 'Course deactivated' });
    } else {
      await em.removeAndFlush(course);
      res.status(204).json({ message: 'Course deleted' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function addUnitToLevel(req: Request, res: Response) {
  const { id, levelId } = req.params; // El id del curso y del nivel
  const { title, description, content } = req.body; // Datos de la unidad a agregar

  try {
    // Buscar el curso y el nivel
    const course = await em.findOneOrFail(
      Course,
      { id: Number(id) },
      { populate: ['levels'] }
    ); // Buscar el curso y sus niveles});
    const level = await em.findOneOrFail(Level, { id: Number(levelId) });

    // Verificar que el nivel esté asociado al curso
    if (!course.levels.contains(level)) {
      return res
        .status(400)
        .json({ message: 'Level is not associated with the course' });
    }

    // Crear la unidad
    const newUnit = em.create(Unit, {
      title,
      description,
      content,
      level, // Asociamos la unidad al nivel
    });

    // Persistir la unidad
    await em.persistAndFlush(newUnit);

    res.status(201).json({ message: 'Unit added successfully', unit: newUnit });
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
  sanitizeCourseInput,
  addUnitToLevel,
};
