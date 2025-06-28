import mongoose from "mongoose";
import { MUTIRAO_STATUS, MUTIRAO_TIPOS } from "../utils/constantes.js";

const AvaliacaoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  nota: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comentario: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

const MutiraoSchema = new mongoose.Schema(
  {
    titulo: String,
    data: String,
    horario: String,
    descricao: String,
    local: String,
    materiais: [String],
    tarefas: [String],

    mutiraoStatus: {
      type: String,
      enum: Object.values(MUTIRAO_STATUS),
      default: MUTIRAO_STATUS.PENDING,
    },

    mutiraoTipo: {
      type: String,
      enum: Object.values(MUTIRAO_TIPOS),
      default: MUTIRAO_TIPOS.SOCIAL,
    },

    inscritos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Usuario",
      },
    ],

    criadoPor: {
      type: mongoose.Types.ObjectId,
      ref: "Usuario",
      //required: true,
    },

    imagemCapa: String,

    ativo: {
      type: Boolean,
      default: true,
    },
    deletadoEm: {
      type: Date,
      default: null,
    },

    finalizado: {
      type: Boolean,
      default: false,
    },

    avaliacoes: [AvaliacaoSchema],
    
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    numeroEComplemento: String,
  },
  { timestamps: true }
);

export default mongoose.model("Mutirao", MutiraoSchema);
