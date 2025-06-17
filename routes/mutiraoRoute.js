import { Router } from "express";
import {
  validateMutiraoInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import express from "express";
import upload from "../utils/multer.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

import {
  getMutiroes,
  getMutirao,
  updateMutirao,
  createMutirao,
  deleteMutirao,
  getTodosMutiroes,
  inscreverUsuario,
  cancelarInscricao,
  getMutiroesInativos,
  getAvaliacoes,
  criarAvaliacao,
  atualizarAvaliacao,
  deletarAvaliacao,
  finalizarMutirao,
  getInscritos,
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
router.route("/").get(getTodosMutiroes);
router
  .route("/")
  .get(getMutiroes)
  .post(upload.single("imagemCapa"), validateMutiraoInput, createMutirao);

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

router.get("/inativos", authenticateUser, getMutiroesInativos);

router
  .route("/:id")
  .get(validateIdParam, getMutirao)
  .patch(upload.single("imagemCapa"), validateMutiraoInput, validateIdParam, updateMutirao)
  .delete(validateIdParam, deleteMutirao);

/**
 * @swagger
 * /mutiroes/{id}/inscrever:
 *   post:
 *     summary: Inscreve um usuário no mutirão
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
 *               usuarioId:
 *                 type: string
 *                 description: ID do usuário a ser inscrito
 *     responses:
 *       200:
 *         description: Usuário inscrito com sucesso no mutirão
 */
router.route("/:id/inscrever").post(validateIdParam, inscreverUsuario);

/**
 * @swagger
 * /mutiroes/{id}/cancelar:
 *   delete:
 *     summary: Cancela a inscrição de um usuário no mutirão
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
 *               usuarioId:
 *                 type: string
 *                 description: ID do usuário a ter a inscrição cancelada
 *     responses:
 *       200:
 *         description: Inscrição cancelada com sucesso
 */
router.route("/:id/cancelar").delete(validateIdParam, cancelarInscricao);

/**
 * @swagger
 * /mutiroes/{id}/inscritos:
 *   get:
 *     summary: Retorna os dados dos usuários inscritos em um mutirão
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
 *         description: Lista de usuários inscritos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *       404:
 *         description: Mutirão não encontrado
 */
router.route("/:id/inscritos").get(validateIdParam, getInscritos);

router.route("/:id/avaliacoes")
  .get(getAvaliacoes)
  .post(authenticateUser, criarAvaliacao);

router
  .route("/:id/avaliacoes/:avaliacaoId")
  .patch(authenticateUser, atualizarAvaliacao)
  .delete(authenticateUser, deletarAvaliacao);

router.route("/:id/finalizar")
  .post(authenticateUser, finalizarMutirao);

export default router;
