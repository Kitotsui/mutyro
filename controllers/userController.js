import {StatusCodes} from "http-status-codes";
import Usuario from "../models/usuarioModel.js";
import Login from "../models/loginModel.js";
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
