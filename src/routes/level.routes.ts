import { Router } from 'express';
import { findAll, findOne } from '../controllers/level.controller.js';

export const levelRouter = Router();
levelRouter.get('/', findAll);
levelRouter.get('/:id', findOne);
