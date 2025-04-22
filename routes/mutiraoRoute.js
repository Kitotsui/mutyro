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
/**
 * @swagger
 * tags:
 *   name: Mutiroes
 *   description: Gerenciamento de mutirões comunitários
 */

/**
 * @swagger
 * /mutiroes:
 *   get:
 *     summary: Lista todos os mutirões
 *     tags: [Mutiroes]
 *     responses:
 *       200:
 *         description: Lista de mutirões retornada com sucesso
 *   post:
 *     summary: Cria um novo mutirão
 *     tags: [Mutiroes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *               local:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mutirão criado com sucesso
 */
router.route("/").get(getMutiroes).post(validateMutiraoInput, createMutirao);

router.route("/todos").get(getTodosMutiroes);

/**
 * @swagger
 * /mutiroes/{id}:
 *   get:
 *     summary: Retorna um mutirão específico
 *     tags: [Mutiroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do mutirão
 *     responses:
 *       200:
 *         description: Mutirão retornado com sucesso
 *   patch:
 *     summary: Atualiza um mutirão existente
 *     tags: [Mutiroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do mutirão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *               local:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mutirão atualizado com sucesso
 *   delete:
 *     summary: Deleta um mutirão
 *     tags: [Mutiroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do mutirão
 *     responses:
 *       200:
 *         description: Mutirão deletado com sucesso
 */
router
  .route("/:id")
  .get(validateIdParam, getMutirao)
  .patch(validateMutiraoInput, validateIdParam, updateMutirao)
  .delete(validateIdParam, deleteMutirao);

export default router;
