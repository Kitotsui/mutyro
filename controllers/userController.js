import {StatusCodes} from "http-status-codes";
import Usuario from "../models/usuarioModel.js";
import bcrypt from "bcryptjs";
import Mutirao from "../models/mutiraoModel.js";

export const getCurrentUser = async (req, res) => {
  console.log("Usuário na requisição:", req.user); // debug
  const usuario = await Usuario.findOne({_id: req.user.userId});
  const usuarioSemSenha = usuario.toJSON();
  res.status(StatusCodes.OK).json({usuario: usuarioSemSenha});
};

//rota de administração
export const getApplicationStats = async (req, res) => {
  const usuarios = await Usuario.countDocuments();
  const mutiroes = await Mutirao.countDocuments({ativo: true});
  res.status(StatusCodes.OK).json({usuarios, mutiroes});
};

export const updateUser = async (req, res) => {
  const obj = {...req.body};
  delete obj.senha; // nao permite que o usuario atualize a senha por esse metodo
  await Usuario.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({msg: "user updated"});
};

// Função para comparar senhas
const compararSenha = async (senha, senhaHash) => {
  return await bcrypt.compare(senha, senhaHash);
};

// Função para redefinir senha
export const redefinirSenhaUsuario = async (req, res) => {
  const { senhaAtual, novaSenha } = req.body;

  try {
    const usuario = await Usuario.findById(req.user.userId);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    // Verifica se a senha atual está correta
    const senhaValida = await compararSenha(senhaAtual, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ msg: "Senha atual incorreta." });
    }

    // Atualiza para a nova senha
    usuario.senha = await bcrypt.hash(novaSenha, 10);
    await usuario.save();

    res.status(StatusCodes.OK).json({ msg: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Erro ao redefinir senha." });
  }
};
