import {Router} from 'express';
import { getCurrentUser, updateUser, getApplicationStats } from '../controllers/userController.js';
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from '../middleware/authMiddleware.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gerenciamento de dados do usuário
 */

/**
 * @swagger
 * /usuarios/atual-usuario:
 *   get:
 *     summary: Retorna os dados do usuário logado
 *     tags: [Usuarios]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *                     isAdmin:
 *                       type: boolean
 *       401:
 *         description: Não autenticado
 */
router.get('/atual-usuario', getCurrentUser);

/**
 * @swagger
 * /usuarios/admin/app-estatistica:
 *   get:
 *     summary: Retorna estatísticas da aplicação (somente para admins)
 *     tags: [Usuarios]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas da aplicação retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuarios:
 *                   type: integer
 *                 mutiroes:
 *                   type: integer
 *       403:
 *         description: Acesso negado (sem permissão de admin)
 *       401:
 *         description: Não autenticado
 */
router.get('/admin/app-estatistica',authorizePermissions(), getApplicationStats);

/**
 * @swagger
 * /usuarios/atualizar-usuario:
 *   patch:
 *     summary: Atualiza dados do usuário autenticado
 *     tags: [Usuarios]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               nome: "João Silva"
 *               email: "joaosilva@gmail.com"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */
router.patch('/atualizar-usuario', validateUpdateUserInput, updateUser);


export default router;