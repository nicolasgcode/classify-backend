import { Request, Response, NextFunction } from "express";
import { Level } from "../entities/level.entity.js";
import { orm } from "../shared/orm.js";
import { validateLevel, validarLevelToPatch } from "../schemas/level.schema.js";
import { ZodError } from "zod";
import { EntityManager } from "@mikro-orm/core";

const em: EntityManager = orm.em.fork();
em.getRepository(Level);
function sanitizeLevelInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    description: req.body.description,
    course: req.body.course,
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
    const levels = await em.find(Level, {}, { populate: ["units"] });
    res.json({ message: "found all levels", data: levels });
  } catch (error: any) {
    res.status(500).json({ message: "Error finding Levels" });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const level = await em.findOneOrFail(
      Level,
      { id },
      { populate: ["units", "course"] }
    );
    if (level.units) {
      level.units.getItems().sort((a, b) => a.order - b.order);
    }
    res.status(200).json({ message: "found level", data: level });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}
async function add(req: Request, res: Response) {
  try {
    const validLevel = validateLevel(req.body.sanitizedInput);
    const courseId = validLevel.course;
    const order = await em.count(Level, { course: courseId });
    const level = em.create(Level, { ...validLevel, order: order + 1 });
    await em.flush();
    const createdLevel = em.getReference(Level, level.id);
    res.status(201).json({ message: "Level created", data: { createdLevel } });
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
    const level = em.getReference(Level, id);
    let levelUpdated;
    if (req.method === "PATCH") {
      levelUpdated = validateLevel(req.body.sanitizedInput);
    } else {
      levelUpdated = validateLevel(req.body.sanitizedInput);
    }
    em.assign(level, levelUpdated);
    await em.flush();
    res.status(200).json({ message: "Level updated", data: level });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: issue.message })));
    }
    res.status(500).send({ message: error.message });
  }
}
async function remove(req: Request, res: Response) {
  await em.transactional(async (em) => {
    try {
      const id = Number.parseInt(req.params.id);
      const level = await em.findOneOrFail(Level, { id });
      const course = level.course;
      const order = level.order;
      await em.removeAndFlush(level);
      const levelsToUpdate = await em.find(Level, {
        course: course.id,
        order: { $gt: order },
      });
      for (const u of levelsToUpdate) {
        u.order -= 1;
        em.persist(u);
      }

      await em.flush();
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
}

export { sanitizeLevelInput, findAll, findOne, add, update, remove };
