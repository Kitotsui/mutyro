import { StatusCodes } from "http-status-codes";
import Mutirao from "../models/mutiraoModel.js";
import { MUTIRAO_TIPOS } from "../utils/constantes.js";

export const getMutiroes = async (req, res) => {
  //console.log(req.user);
  const mutiroes = await Mutirao.find({
    criadoPor: req.user.userId,
    ativo: true,
  }); // Busca todos os mutirões do usuário logado que estao ativos
  res.status(StatusCodes.OK).json({ mutiroes });
};

export const getTodosMutiroes = async (req, res) => {
  //console.log(req.user);
  const mutiroes = await Mutirao.find({ ativo: true }).populate(
    "criadoPor",
    "nome"
  );

  res.status(StatusCodes.OK).json({ mutiroes });
};

export const createMutirao = async (req, res) => {
  //LOGS PARA DEBUG
  console.log("Tipo recebido:", req.body.mutiraoTipo);
  console.log("Valores permitidos:", Object.values(MUTIRAO_TIPOS));
  console.log("Corpo completo da requisição:", req.body);
  try {
    // verificação de tipo de mutirao
    if (!Object.values(MUTIRAO_TIPOS).includes(req.body.mutiraoTipo)) {
      return res.status(400).json({ msg: "Tipo de mutirão inválidop" });
    }

    // Define a imagem padrão ou a enviada
    let imagePath = "/uploads/default.png";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const mutirao = await Mutirao.create({
      ...req.body,
      criadoPor: req.user.userId,
      imagemCapa: imagePath,
    });

    res.status(201).json({ mutirao });
  } catch (error) {
    console.error("Erro ao criar mutirão:", error);

    // Remove o arquivo se houve erro
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(500).json({
      msg: "Erro ao criar mutirão",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

export const getMutirao = async (req, res) => {
  const { id } = req.params;
  const mutirao = await Mutirao.findById(id).populate("criadoPor", "nome _id");

  res.status(StatusCodes.OK).json({ mutirao });
};

// Busca de mutirões inativos
export const getMutiroesInativos = async (req, res) => {
  const mutiroes = await Mutirao.find({
    criadoPor: req.user.userId,
    ativo: false,
  });
  res.status(StatusCodes.OK).json({ mutiroes });
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
  const updatedMutirao = await Mutirao.findByIdAndUpdate(
    id,
    {
      ativo: false,
      deletadoEm: new Date(),
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    message: "Mutirão marcado como inativo com sucesso!",
    mutirao: updatedMutirao,
  });
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
