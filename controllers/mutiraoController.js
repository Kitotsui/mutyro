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
  const mutiroes = await Mutirao.find({ ativo: true }); // Busca todos os mutirões do usuário logado que estao ativos
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

    // Verifica se faltam menos de 48 horas para o mutirão
    const dataMutirao = new Date(`${req.body.data}T${req.body.horario}`);
    const agora = new Date();
    const diferencaMs = dataMutirao.getTime() - agora.getTime();
    const horasQueFaltam = diferencaMs / (1000 * 60 * 60);

    if (horasQueFaltam < 48) {
      return res.status(400).json({
        msg: "Não é possível criar um mutirão com menos de 48 horas de antecedência",
      });
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
    ativo: false 
  });
  res.status(StatusCodes.OK).json({ mutiroes });
};

export const updateMutirao = async (req, res) => {
  const { id } = req.params;

  // Verifica se o usuário eh o criador ou admin
  const mutiraoExistente = await Mutirao.findById(id);
  if (!mutiraoExistente) {
    return res.status(404).json({ msg: "Mutirão não encontrado" });
  }

  if (
    mutiraoExistente.criadoPor.toString() !== req.user.userId &&
    !req.user.isAdmin
  ) {
    return res.status(403).json({ msg: "Não autorizado" });
  }

  // verifica se falta menos de 48 horas para o mutirão
  const dataMutirao = new Date(mutiraoExistente.data);
  const agora = new Date();
  const diferencaMs = dataMutirao - agora;

  if (diferencaMs < 48 * 60 * 60 * 1000) {
    return res.status(400).json({
      msg: "Não é possível editar o mutirão faltando menos de 48 horas para o início",
    });
  }

  // Atualiza a imagem se uma nova foi enviada
  let imagePath = mutiraoExistente.imagemCapa;
  if (req.file) {
    imagePath = `/uploads/${req.file.filename}`;
    // tem que implementar para apagar a imagem antiga
  }

  const updatedMutirao = await Mutirao.findByIdAndUpdate(
    id,
    {
      ...req.body,
      imagemCapa: imagePath,
    },
    {
      new: true,
    }
  );

  //res.status(StatusCodes.OK).json({ mutirao: updatedMutirao }); NOVO

  /*const updatedMutirao = await Mutirao.findByIdAndUpdate(id, req.body, { new: true, }); ANTIGO*/

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

  res
    .status(StatusCodes.OK)
    .json({
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
