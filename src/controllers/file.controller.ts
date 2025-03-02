import { Request, Response, NextFunction } from 'express';
import { File } from '../entities/file.entity.js';
import { orm } from '../shared/orm.js';
import { validateFile } from '../schemas/file.schema.js';
import { ZodError } from 'zod';

const em = orm.em;

em.getRepository(File);

async function add(req: Request, res: Response) {
  try {
    const parsedData = validateFile(req.body.sanitizedInput);
    const file = em.create(File, parsedData);
    await em.flush();
    res.status(201).json({ message: 'File added successfully', data: file });
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
    const files = await em.find(File, {});
    res.status(200).json({ message: 'Found all files', data: files });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const file = await em.findOneOrFail(File, { id });
    res.status(200).json({ message: 'Found file', data: file });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const fileToUpdate = await em.findOneOrFail(File, { id });
    em.assign(fileToUpdate, req.body.sanitizedInput);
    await em.flush();
    res
      .status(200)
      .json({ message: 'File updated successfully', data: fileToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const unit = em.getReference(File, id);
    await em.removeAndFlush(unit);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove };
