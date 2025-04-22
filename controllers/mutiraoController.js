import { StatusCodes } from "http-status-codes";
import Mutirao from "../models/mutiraoModel.js";

export const getMutiroes = async (req, res) => {
  //console.log(req.user);
  const mutiroes = await Mutirao.find({ criadoPor: req.user.userId }); // Busca todos os mutirões do usuário logado
  res.status(StatusCodes.OK).json({ mutiroes });
};

export const getTodosMutiroes = async (req, res) => {
  //console.log(req.user);
  const mutiroes = await Mutirao.find({}); // Busca todos os mutirões do usuário logado
  res.status(StatusCodes.OK).json({ mutiroes });
};

export const createMutirao = async (req, res) => {
  req.body.criadoPor = req.user.userId; // Adiciona o id do usuário logado ao mutirão
  const mutirao = await Mutirao.create(req.body); // Criar um novo mutirão utilizando o modelo Mutirao do models
  res.status(StatusCodes.CREATED).json({ mutirao });
  console.log("Mutirão criado com sucesso!");
};

export const getMutirao = async (req, res) => {
  const { id } = req.params;
  const mutirao = await Mutirao.findById(id).populate("criadoPor", "nome _id");

  res.status(StatusCodes.OK).json({ mutirao });
};

export const updateMutirao = async (req, res) => {
  const { id } = req.params;
  const updatedMutirao = await Mutirao.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json("Mutirão atualizado com sucesso!");
};

export const deleteMutirao = async (req, res) => {
  const { id } = req.params;
  const removedMutirao = await Mutirao.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ message: "Mutirão deletado com sucesso!" });
};

export const inscreverUsuario = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const mutiraoInscricao = await Mutirao.findByIdAndUpdate(id, {
    $addToSet: { inscritos: userId },
  });
  res
    .status(StatusCodes.OK)
    .json(`Usuário ${userId} inscrito com sucesso no mutirão ${id} !`);
};

export const cancelarInscricao = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const mutiraoInscricao = await Mutirao.findByIdAndUpdate(id, {
    $pull: { inscritos: userId },
  });
  res
    .status(StatusCodes.OK)
    .json(
      `Usuário ${userId} cancelou a inscrição no mutirão ${id} com sucesso!`
    );
};
