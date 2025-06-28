import { Router } from "express";
import {
  validateMutiraoInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import upload from "../utils/multer.js";
import {
  authenticateUser,
  populateUserIfLoggedIn,
} from "../middleware/authMiddleware.js";
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

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Mutiroes
 *   description: Gerenciamento de mutirões comunitários
 */

/**
 * @swagger
 * /mutiroes/todos:
 *   get:
 *     summary: Lista todos os mutirões ativos (acessível por guests e usuários)
 *     tags: [Mutiroes]
 *     responses:
 *       '200':
 *         description: "Lista de mutirões retornada com sucesso"
 */
router.route("/todos").get(populateUserIfLoggedIn, getTodosMutiroes);

/**
 * @swagger
 * /mutiroes:
 *   get:
 *     summary: Lista os mutirões ativos criados pelo usuário autenticado
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: "Lista de mutirões do usuário retornada com sucesso"
 *       '401':
 *         description: "Não autenticado"
 *   post:
 *     summary: Cria um novo mutirão (requer autenticação)
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo: { type: string }
 *               data: { type: string, format: date }
 *               horario: { type: string }
 *               descricao: { type: string }
 *               local: { type: string }
 *               numeroEComplemento: { type: string }
 *               latitude: { type: string }
 *               longitude: { type: string }
 *               materiais: { type: array, items: { type: string } }
 *               tarefas: { type: array, items: { type: string } }
 *               mutiraoTipo: { type: string }
 *               imagemCapa: { type: string, format: binary }
 *     responses:
 *       '201':
 *         description: "Mutirão criado com sucesso"
 *       '400':
 *         description: "Dados de entrada inválidos"
 *       '401':
 *         description: "Não autenticado"
 */
router
  .route("/")
  .get(authenticateUser, getMutiroes)
  .post(
    authenticateUser,
    upload.single("imagemCapa"),
    validateMutiraoInput,
    createMutirao
  );

/**
 * @swagger
 * /mutiroes/inativos:
 *   get:
 *     summary: Lista os mutirões inativos criados pelo usuário autenticado
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: "Lista de mutirões inativos retornada com sucesso"
 *       '401':
 *         description: "Não autenticado"
 */
router.route("/inativos").get(authenticateUser, getMutiroesInativos);

/**
 * @swagger
 * /mutiroes/{id}:
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: ID do mutirão
 *       schema:
 *         type: string
 *   get:
 *     summary: Retorna um mutirão específico (acessível por guests e usuários)
 *     tags: [Mutiroes]
 *     responses:
 *       '200':
 *         description: "Mutirão retornado com sucesso"
 *       '404':
 *         description: "Mutirão não encontrado"
 *   patch:
 *     summary: Atualiza um mutirão existente (requer autenticação e ser o dono ou admin)
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo: { type: string }
 *               imagemCapa: { type: string, format: binary }
 *     responses:
 *       '200':
 *         description: "Mutirão atualizado com sucesso"
 *       '400':
 *         description: "Dados inválidos ou regra de negócio violada (ex: 48h)"
 *       '401':
 *         description: "Não autenticado"
 *       '403':
 *         description: "Não autorizado (não é o dono ou admin)"
 *       '404':
 *         description: "Mutirão não encontrado"
 *   delete:
 *     summary: Marca um mutirão como inativo (requer autenticação e ser o dono ou admin)
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: "Mutirão marcado como inativo com sucesso"
 *       '401':
 *         description: "Não autenticado"
 *       '403':
 *         description: "Não autorizado"
 *       '404':
 *         description: "Mutirão não encontrado"
 */
router
  .route("/:id")
  .get(populateUserIfLoggedIn, validateIdParam, getMutirao)
  .patch(
    authenticateUser,
    upload.single("imagemCapa"),
    validateMutiraoInput,
    validateIdParam,
    updateMutirao
  )
  .delete(authenticateUser, validateIdParam, deleteMutirao);

/**
 * @swagger
 * /mutiroes/{id}/inscrever:
 *   post:
 *     summary: Inscreve o usuário autenticado no mutirão
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do mutirão
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "Usuário inscrito com sucesso no mutirão"
 *       '401':
 *         description: "Não autenticado"
 *       '404':
 *         description: "Mutirão não encontrado"
 */
router
  .route("/:id/inscrever")
  .post(authenticateUser, validateIdParam, inscreverUsuario);

/**
 * @swagger
 * /mutiroes/{id}/cancelar:
 *   delete:
 *     summary: Cancela a inscrição do usuário autenticado no mutirão
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do mutirão
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "Inscrição cancelada com sucesso"
 *       '401':
 *         description: "Não autenticado"
 *       '404':
 *         description: "Mutirão não encontrado"
 */
router
  .route("/:id/cancelar")
  .delete(authenticateUser, validateIdParam, cancelarInscricao);

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
