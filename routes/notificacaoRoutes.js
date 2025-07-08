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

router.get('/', authenticateUser, getNotificacoes);
router.get('/contar', authenticateUser, contarNotificacoesNaoLidas);
router.post('/', authenticateUser, criarNotificacao);
router.patch('/:id/marcar-lida', authenticateUser, marcarComoLida);
router.patch('/:id/favorita', authenticateUser, toggleFavorita);
router.patch('/todas/marcar-lidas', authenticateUser, marcarTodasComoLidas);
router.delete('/:id', authenticateUser, excluirNotificacao);

export default router; 