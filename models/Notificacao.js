import mongoose from 'mongoose';

const notificacaoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipo: {
    type: String,
    enum: ['info', 'alerta', 'sucesso'],
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  mensagem: {
    type: String,
    required: true
  },
  lida: {
    type: Boolean,
    default: false
  },
  mutiraoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mutirao'
  },
  data: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices para melhorar a performance das consultas
notificacaoSchema.index({ usuarioId: 1, lida: 1 });
notificacaoSchema.index({ data: -1 });

const Notificacao = mongoose.model('Notificacao', notificacaoSchema);

export default Notificacao; 