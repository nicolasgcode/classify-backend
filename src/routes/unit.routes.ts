import { Router } from "express";
import {
  sanitizeUnitInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from "../controllers/unit.controller.js";

export const unitRouter = Router();

unitRouter.get("/", findAll);
unitRouter.get("/:id", findOne);
unitRouter.post("/", sanitizeUnitInput, add);
unitRouter.put("/:id", sanitizeUnitInput, update);
unitRouter.patch("/:id", sanitizeUnitInput, update);
unitRouter.delete("/:id", remove);
