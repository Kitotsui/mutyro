import { Router } from "express";
import {
  validateMutiraoInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
const router = Router();

import {
  getMutiroes,
  getMutirao,
  updateMutirao,
  createMutirao,
  deleteMutirao,
  getTodosMutiroes,
} from "../controllers/mutiraoController.js";

router.route("/").get(getMutiroes).post(validateMutiraoInput, createMutirao);
router.route("/todos").get(getTodosMutiroes);
router
  .route("/:id")
  .get(validateIdParam, getMutirao)
  .patch(validateMutiraoInput, validateIdParam, updateMutirao)
  .delete(validateIdParam, deleteMutirao);

export default router;
