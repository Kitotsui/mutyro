import { Router } from "express";
import {
  validateMutiraoInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { uploadMutiraoImage } from "../utils/multer.js";
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
  getMutiroesAvaliados,
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
 * /mutiroes/historiasDeSucesso:
 *   get:
 *     summary: Retorna uma lista de mutirões finalizados com comentários de usuários para o carrossel
 *     tags: [Mutiroes]
 *     responses:
 *       '200':
 *         description: Histórias de sucesso retornadas com sucesso
 */
router.route("/historiasDeSucesso").get(getMutiroesAvaliados);

/**
 * @swagger
 * /mutiroes/todos:
 *   get:
 *     summary: Lista todos os mutirões ativos (acessível por guests e usuários)
 *     tags: [Mutiroes]
 *     responses:
 *       200:
 *         description: Lista de mutirões retornada com sucesso
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
 *       200:
 *         description: Lista de mutirões do usuário retornada com sucesso
 *       401:
 *         description: Não autenticado
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
 *               titulo:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *               horario:
 *                 type: string
 *               descricao:
 *                 type: string
 *               local:
 *                 type: string
 *               numeroEComplemento:
 *                 type: string
 *               latitude:
 *                 type: string
 *               longitude:
 *                 type: string
 *               materiais:
 *                 type: array
 *                 items:
 *                   type: string
 *               tarefas:
 *                 type: array
 *                 items:
 *                   type: string
 *               mutiraoTipo:
 *                 type: string
 *               imagemCapa:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Mutirão criado com sucesso
 *       400:
 *         description: Dados de entrada inválidos
 *       401:
 *         description: Não autenticado
 */
router
  .route("/")
  .get(authenticateUser, getMutiroes)
  .post(
    authenticateUser,
    uploadMutiraoImage.single("imagemCapa"),
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
 *       200:
 *         description: Lista de mutirões inativos retornada com sucesso
 *       401:
 *         description: Não autenticado
 */
router.route("/inativos").get(authenticateUser, getMutiroesInativos);

/**
 * @swagger
 * /mutiroes/{id}:
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
 *               titulo:
 *                 type: string
 *               imagemCapa:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Mutirão atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou regra de negócio violada, como o prazo de 48 horas
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado (não é o dono ou admin)
 *       404:
 *         description: Mutirão não encontrado
 */
router
  .route("/:id")
  .get(populateUserIfLoggedIn, validateIdParam, getMutirao)
  .patch(
    authenticateUser,
    uploadMutiraoImage.single("imagemCapa"),
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
 *       200:
 *         description: Usuário inscrito com sucesso no mutirão
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Mutirão não encontrado
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
 *       200:
 *         description: Inscrição cancelada com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Mutirão não encontrado
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

/**
 * @swagger
 * /mutiroes/{id}/avaliacoes:
 *   get:
 *     summary: Retorna as avaliações de um mutirão
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
 *         description: Lista de avaliações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   usuario:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                   nota:
 *                     type: number
 *                   comentario:
 *                     type: string
 *       404:
 *         description: Mutirão não encontrado
 *   post:
 *     summary: Cria uma avaliação para um mutirão
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
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
 *               nota:
 *                 type: number
 *               comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Mutirão não encontrado
 */
router
  .route("/:id/avaliacoes")
  .get(getAvaliacoes)
  .post(authenticateUser, criarAvaliacao);

/**
 * @swagger
 * /mutiroes/{id}/avaliacoes/{avaliacaoId}:
 *   patch:
 *     summary: Atualiza uma avaliação de um mutirão
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do mutirão
 *       - in: path
 *         name: avaliacaoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: number
 *               comentario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Mutirão ou avaliação não encontrado
 *   delete:
 *     summary: Remove uma avaliação de um mutirão
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do mutirão
 *       - in: path
 *         name: avaliacaoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação removida com sucesso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Mutirão ou avaliação não encontrado
 */
router
  .route("/:id/avaliacoes/:avaliacaoId")
  .patch(authenticateUser, atualizarAvaliacao)
  .delete(authenticateUser, deletarAvaliacao);

/**
 * @swagger
 * /mutiroes/{id}/finalizar:
 *   post:
 *     summary: Finaliza um mutirão
 *     tags: [Mutiroes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do mutirão
 *     responses:
 *       200:
 *         description: Mutirão finalizado com sucesso
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Mutirão não encontrado
 */
router.route("/:id/finalizar").post(authenticateUser, finalizarMutirao);

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

router
  .route("/:id/avaliacoes")
  .get(getAvaliacoes)
  .post(authenticateUser, criarAvaliacao);

router
  .route("/:id/avaliacoes/:avaliacaoId")
  .patch(authenticateUser, atualizarAvaliacao)
  .delete(authenticateUser, deletarAvaliacao);

router.route("/:id/finalizar").post(authenticateUser, finalizarMutirao);

export default router;
