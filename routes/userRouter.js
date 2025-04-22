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
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 */
router.get('/atual-usuario', getCurrentUser);

/**
 * @swagger
 * /usuarios/admin/app-estatistica:
 *   get:
 *     summary: Retorna estatísticas da aplicação (somente para admins)
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Estatísticas da aplicação retornadas com sucesso
 *       403:
 *         description: Acesso negado (sem permissão de admin)
 */
router.get('/admin/app-estatistica',authorizePermissions(), getApplicationStats);

/**
 * @swagger
 * /usuarios/atualizar-usuario:
 *   patch:
 *     summary: Atualiza dados do usuário autenticado
 *     tags: [Usuarios]
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
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
router.patch('/atualizar-usuario', validateUpdateUserInput, updateUser);


export default router;