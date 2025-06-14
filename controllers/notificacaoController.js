import Notificacao from '../models/Notificacao.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

// Buscar notificações do usuário
export const getNotificacoes = async (req, res) => {
  const { lida } = req.query;
  const query = { usuarioId: req.user.userId };
  
  if (lida !== undefined) {
    query.lida = lida === 'true';
  }

  const notificacoes = await Notificacao.find(query)
    .sort({ data: -1 })
    .populate('mutiraoId', 'titulo data');

  res.status(StatusCodes.OK).json({ notificacoes });
};

// Marcar notificação como lida
export const marcarComoLida = async (req, res) => {
  const { id } = req.params;
  
  const notificacao = await Notificacao.findOneAndUpdate(
    { _id: id, usuarioId: req.user.userId },
    { lida: true },
    { new: true }
  );

  if (!notificacao) {
    throw new NotFoundError('Notificação não encontrada');
  }

  res.status(StatusCodes.OK).json({ notificacao });
};

// Criar nova notificação (admin)
export const criarNotificacao = async (req, res) => {
  const { usuarioId, tipo, titulo, mensagem, mutiraoId } = req.body;

  if (!usuarioId || !tipo || !titulo || !mensagem) {
    throw new BadRequestError('Por favor, forneça todos os campos necessários');
  }

  const notificacao = await Notificacao.create({
    usuarioId,
    tipo,
    titulo,
    mensagem,
    mutiraoId
  });

  res.status(StatusCodes.CREATED).json({ notificacao });
};

// Criar notificação automática para mutirão
export const criarNotificacaoMutirao = async (mutiraoId, tipo, titulo, mensagem) => {
  const mutirao = await Mutirao.findById(mutiraoId).populate('participantes');
  
  if (!mutirao) {
    throw new NotFoundError('Mutirão não encontrado');
  }

  const notificacoes = mutirao.participantes.map(participante => ({
    usuarioId: participante._id,
    tipo,
    titulo,
    mensagem,
    mutiraoId
  }));

  await Notificacao.insertMany(notificacoes);
};

// Contar notificações não lidas
export const contarNotificacoesNaoLidas = async (req, res) => {
  const count = await Notificacao.countDocuments({
    usuarioId: req.user.userId,
    lida: false
  });

  res.status(StatusCodes.OK).json({ count });
};

// Marcar todas as notificações como lidas
export const marcarTodasComoLidas = async (req, res) => {
  await Notificacao.updateMany(
    { usuarioId: req.user.userId, lida: false },
    { lida: true }
  );
  res.status(StatusCodes.OK).json({ msg: 'Todas as notificações marcadas como lidas' });
}; 