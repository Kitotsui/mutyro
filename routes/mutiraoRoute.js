import { Router } from "express";
const router = Router();

import {
  getMutiroes,
  getMutirao,
  updateMutirao,
  createMutirao,
  deleteMutirao,
} from "../controllers/mutiraoController.js";

router.route("/").get(getMutiroes).post(createMutirao);
router.route("/:id").get(getMutirao).patch(updateMutirao).delete(deleteMutirao);

export default router;