import mongoose from 'mongoose';

const notificacaoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  variaveis: {
    type: Object,
    default: {}
  },
  lida: {
    type: Boolean,
    default: false
  },
  favorita: {
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
notificacaoSchema.index({ usuarioId: 1, favorita: 1 });
notificacaoSchema.index({ data: -1 });

const Notificacao = mongoose.model('Notificacao', notificacaoSchema);

export default Notificacao; 