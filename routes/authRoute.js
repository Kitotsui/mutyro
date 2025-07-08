import {Router} from 'express';
import {login, cadastro, logout, googleCallback, enviarLinkRedefinicao, redefinirSenha} from '../controllers/authController.js';
import { validateCadastroInput, validateLoginInput } from '../middleware/validationMiddleware.js';
import { redefinirSenhaUsuario } from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
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

// Rota para enviar o link de redefinição de senha
/**
 * @swagger
 * /auth/redefinir-senha:
 *   post:
 *     summary: Envia um link de redefinição de senha para o e-mail do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: "joaosilva@gmail.com"
 *     responses:
 *       200:
 *         description: Link de redefinição enviado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao enviar o link de redefinição
 */
router.post("/redefinir-senha", enviarLinkRedefinicao);

// Rota para redefinir a senha
/**
 * @swagger
 * /auth/redefinir-senha/confirmar:
 *   post:
 *     summary: Redefine a senha do usuário usando o token enviado por e-mail
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - novaSenha
 *             properties:
 *               token:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *             example:
 *               token: "abc123xyz"
 *               novaSenha: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao redefinir a senha
 */
router.post("/redefinir-senha/confirmar", redefinirSenha);

/**
 * @swagger
 * /auth/recuperar-senha:
 *   post:
 *     summary: Redefine a senha do usuário autenticado
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senhaAtual
 *               - novaSenha
 *             properties:
 *               senhaAtual:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *             example:
 *               senhaAtual: "senhaAtual123"
 *               novaSenha: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Senha atual incorreta
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao redefinir a senha
 */
router.post("/recuperar-senha", authenticateUser, redefinirSenhaUsuario);

export default router;