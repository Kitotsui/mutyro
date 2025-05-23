import mongoose from "mongoose";
import { MUTIRAO_STATUS, MUTIRAO_TIPOS } from "../utils/constantes.js";

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
  },
  { timestamps: true }
);

export default mongoose.model("Mutirao", MutiraoSchema);
