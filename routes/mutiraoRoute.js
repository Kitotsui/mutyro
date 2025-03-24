import { Router } from "express";
const router = Router();

import {
  getMutiroes,
  getMutirao,
  updateMutirao,
  createMutirao,
  deleteMutirao,
} from "../controllers/mutiraoController.js";

/*router.get("/api/v1/mutiroes", getMutiroes);
router.post("/api/v1/mutiroes", createMutirao);
router.get("/api/v1/mutiroes/:id", getMutirao);
router.patch("/api/v1/mutiroes/:id", updateMutirao);
router.delete("/api/v1/mutiroes/:id", deleteMutirao);*/

router.route("/").get(getMutiroes).post(createMutirao);
router.route("/:id").get(getMutirao).patch(updateMutirao).delete(deleteMutirao);

export default router;