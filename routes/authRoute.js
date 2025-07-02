import {Router} from 'express';
import {login, cadastro, logout, googleCallback} from '../controllers/authController.js';
import { validateCadastroInput, validateLoginInput } from '../middleware/validationMiddleware.js';
import passport from "passport";
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
 *             example:
 *               nome: "João Silva"
 *               email: "joaosilva@gmail.com"
 *               senha: "123456"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
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
 *             example:
 *               email: "joaosilva@gmail.com"
 *               senha: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 token:
 *                   type: string
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
 *         description: Credenciais inválidas
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

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Inicia o processo de autenticação via Google
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redireciona para a página de login do Google
 */
router.get('/google', passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback do Google após autenticação
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redireciona para a página de usuário no frontend
 *       500:
 *         description: Erro ao processar autenticação via Google
 */
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), googleCallback);


export default router;