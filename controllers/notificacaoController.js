import Notificacao from '../models/Notificacao.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import { criarNotificacaoPadronizada } from '../utils/notificacaoUtils.js';

// Buscar notificações do usuário
export const getNotificacoes = async (req, res) => {
  const { lida } = req.query;
  const query = { usuarioId: req.user.userId };
  
  if (lida !== undefined) {
    query.lida = lida === 'true';
  }

  let notificacoes = await Notificacao.find(query)
    .sort({ data: -1 })
    .populate('mutiraoId', 'titulo data');

  // Preencher variaveis.mutirao se estiver faltando
  notificacoes = notificacoes.map((notif) => {
    if (
      (!notif.variaveis || !notif.variaveis.mutirao) &&
      notif.mutiraoId && notif.mutiraoId.titulo
    ) {
      notif.variaveis = { ...notif.variaveis, mutirao: notif.mutiraoId.titulo };
    }
    return notif;
  });

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
  const { usuarioId, tipo, mutiraoId, ...variaveis } = req.body;

  if (!usuarioId || !tipo) {
    throw new BadRequestError('Por favor, forneça todos os campos necessários');
  }

  const notificacao = await Notificacao.create(
    criarNotificacaoPadronizada({ usuarioId, tipo, variaveis, mutiraoId })
  );
  console.log('Notificação criada:', JSON.stringify(notificacao, null, 2));

  res.status(StatusCodes.CREATED).json({ notificacao });
};

// Criar notificação automática para mutirão
export const criarNotificacaoMutirao = async (mutiraoId, tipo, variaveis = {}) => {
  const mutirao = await Mutirao.findById(mutiraoId).populate('participantes');
  if (!mutirao) {
    throw new NotFoundError('Mutirão não encontrado');
  }
  const notificacoes = mutirao.participantes.map(participante => (
    criarNotificacaoPadronizada({
      usuarioId: participante._id,
      tipo,
      variaveis: { ...variaveis, mutirao: mutirao.titulo },
      mutiraoId
    })
  ));
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

// Excluir notificação
export const excluirNotificacao = async (req, res) => {
  const { id } = req.params;
  
  const notificacao = await Notificacao.findOneAndDelete({
    _id: id,
    usuarioId: req.user.userId
  });

  if (!notificacao) {
    throw new NotFoundError('Notificação não encontrada');
  }

  res.status(StatusCodes.OK).json({ msg: 'Notificação excluída com sucesso' });
};

// Favoritar/desfavoritar notificação
export const toggleFavorita = async (req, res) => {
  const { id } = req.params;
  
  const notificacao = await Notificacao.findOne({ _id: id, usuarioId: req.user.userId });
  
  if (!notificacao) {
    throw new NotFoundError('Notificação não encontrada');
  }

  notificacao.favorita = !notificacao.favorita;
  await notificacao.save();

  res.status(StatusCodes.OK).json({ 
    notificacao,
    msg: notificacao.favorita ? 'Notificação favoritada' : 'Notificação desfavoritada'
  });
}; 