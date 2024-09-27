import { Router } from "express";
import {
  sanitizeCourseInput,
  sanitizeCourseToPatchInput,
  sanitizeSearchInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  findBytitle,
} from "./course.controller.js";

export const courseRouter = Router();

courseRouter.get("/", findAll);
courseRouter.get("/:id", findOne);
courseRouter.post("/", sanitizeCourseInput, add);
courseRouter.patch("/:id", sanitizeCourseToPatchInput, update);
courseRouter.put("/:id", sanitizeCourseInput, update);
courseRouter.delete("/:id", remove);
courseRouter.get("/search", sanitizeSearchInput, findBytitle);
