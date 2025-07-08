import express from 'express';
import {
  getNotificacoes,
  marcarComoLida,
  criarNotificacao,
  contarNotificacoesNaoLidas,
  marcarTodasComoLidas,
  excluirNotificacao,
  toggleFavorita
} from '../controllers/notificacaoController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notificacoes
 *   description: Gerenciamento de notificações dos usuários
 */

/**
 * @swagger
 * /notificacoes:
 *   get:
 *     summary: Retorna as notificações do usuário autenticado
 *     tags: [Notificacoes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: lida
 *         schema:
 *           type: boolean
 *         description: Filtra notificações por status de leitura (true ou false)
 *     responses:
 *       200:
 *         description: Lista de notificações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notificacoes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       titulo:
 *                         type: string
 *                       mensagem:
 *                         type: string
 *                       lida:
 *                         type: boolean
 *                       data:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Não autenticado
 */
router.get('/', authenticateUser, getNotificacoes);

/**
 * @swagger
 * /notificacoes/contar:
 *   get:
 *     summary: Retorna a contagem de notificações não lidas do usuário autenticado
 *     tags: [Notificacoes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Contagem de notificações não lidas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *       401:
 *         description: Não autenticado
 */
router.get('/contar', authenticateUser, contarNotificacoesNaoLidas);

/**
 * @swagger
 * /notificacoes:
 *   post:
 *     summary: Cria uma nova notificação (somente para admins)
 *     tags: [Notificacoes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *               tipo:
 *                 type: string
 *               titulo:
 *                 type: string
 *               mensagem:
 *                 type: string
 *               mutiraoId:
 *                 type: string
 *             example:
 *               usuarioId: "64a7b2f4e4b0f5c3a1d2e3f4"
 *               tipo: "informativo"
 *               titulo: "Novo mutirão disponível"
 *               mensagem: "Participe do mutirão de limpeza no parque central"
 *               mutiraoId: "64a7b2f4e4b0f5c3a1d2e3f5"
 *     responses:
 *       201:
 *         description: Notificação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notificacao:
 *                   type: object
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */
router.post('/', authenticateUser, criarNotificacao);

/**
 * @swagger
 * /notificacoes/{id}/marcar-lida:
 *   patch:
 *     summary: Marca uma notificação como lida
 *     tags: [Notificacoes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da notificação
 *     responses:
 *       200:
 *         description: Notificação marcada como lida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notificacao:
 *                   type: object
 *       404:
 *         description: Notificação não encontrada
 *       401:
 *         description: Não autenticado
 */
router.patch('/:id/marcar-lida', authenticateUser, marcarComoLida);
router.patch('/:id/favorita', authenticateUser, toggleFavorita);

/**
 * @swagger
 * /notificacoes/todas/marcar-lidas:
 *   patch:
 *     summary: Marca todas as notificações como lidas
 *     tags: [Notificacoes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todas as notificações marcadas como lidas com sucesso
 *       401:
 *         description: Não autenticado
 */
router.patch('/todas/marcar-lidas', authenticateUser, marcarTodasComoLidas);

/**
 * @swagger
 * /notificacoes/{id}:
 *   delete:
 *     summary: Exclui uma notificação
 *     tags: [Notificacoes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da notificação
 *     responses:
 *       200:
 *         description: Notificação excluída com sucesso
 *       404:
 *         description: Notificação não encontrada
 *       401:
 *         description: Não autenticado
 */
router.delete('/:id', authenticateUser, excluirNotificacao);

export default router; 