import { Router } from "express";
import {
  sanitizeLevelInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from "../controllers/level.controller.js";

export const levelRouter = Router();
levelRouter.post("/", sanitizeLevelInput, add);
levelRouter.get("/", findAll);
levelRouter.get("/:id", findOne);
levelRouter.patch("/:id", sanitizeLevelInput, update);
levelRouter.put("/:id", sanitizeLevelInput, update);
levelRouter.delete("/:id", remove);
