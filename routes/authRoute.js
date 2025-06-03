import {Router} from 'express';
import {login, cadastro, logout} from '../controllers/authController.js';
import { validateCadastroInput, validateLoginInput } from '../middleware/validationMiddleware.js';
const router = Router();

router.post('/cadastro', validateCadastroInput, cadastro);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas de autenticação
 */

/**
 * @swagger
 * /auth/cadastro:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 */
router.post('/cadastro', validateCadastroInput, cadastro);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post('/login', validateLoginInput, login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Faz logout do usuário
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */
router.get('/logout', logout);


export default router;