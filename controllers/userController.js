import { StatusCodes } from "http-status-codes";
import Usuario from "../models/usuarioModel.js";
import Login from "../models/loginModel.js";
import Mutirao from "../models/mutiraoModel.js";
import { v2 as cloudionary } from "cloudinary";

export const getCurrentUser = async (req, res) => {
  console.log("Usuário na requisição:", req.user); // debug
  const usuario = await Usuario.findOne({ _id: req.user.userId });
  const usuarioSemSenha = usuario.toJSON();
  res.status(StatusCodes.OK).json({ usuario: usuarioSemSenha });
};

//rota de administração
export const getApplicationStats = async (req, res) => {
  const usuarios = await Usuario.countDocuments();
  const mutiroes = await Mutirao.countDocuments({ ativo: true });
  res.status(StatusCodes.OK).json({ usuarios, mutiroes });
};

export const updateUser = async (req, res) => {
  const updateData = {
    nome: req.body.nome,
    email: req.body.email,
    endereco: req.body.endereco,
    cpf: req.body.cpf,
    dataNascimento: req.body.dataNascimento,
  };

  Object.keys(updateData).forEach(
    (key) => updateData[key] === undefined && delete updateData[key]
  );

  if (req.file) {
    updateData.avatar = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    const user = await Usuario.findById(req.user.userId);
    if (user?.avatar?.public_id) {
      try {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      } catch (deleteError) {
        console.error(
          "Erro ao deletar avatar antigo do Cloudinary:",
          deleteError
        );
      }
    }
  }

  const updatedUser = await Usuario.findByIdAndUpdate(
    req.user.userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "Perfil atualizado com sucesso!", usuario: updatedUser });
};
