import {StatusCodes} from "http-status-codes";
import Mutirao from "../models/mutiraoModel.js";
import { MUTIRAO_TIPOS } from "../utils/constantes.js";
import fs from "fs/promises";

export const getMutiroes = async (req, res) => {
  //console.log(req.user);
  const mutiroes = await Mutirao.find({
    criadoPor: req.user.userId,
    ativo: true,
  }); // Busca todos os mutirões do usuário logado que estao ativos
  res.status(StatusCodes.OK).json({mutiroes});
};

export const getTodosMutiroes = async (req, res) => {
  //console.log(req.user);
  const mutiroes = await Mutirao.find({ativo: true}).populate("criadoPor", "nome");

  res.status(StatusCodes.OK).json({mutiroes});
};

export const createMutirao = async (req, res) => {
  //LOGS PARA DEBUG
  console.log("Tipo recebido:", req.body.mutiraoTipo);
  console.log("Valores permitidos:", Object.values(MUTIRAO_TIPOS));
  console.log("Corpo completo da requisição:", req.body);

  const {
    titulo,
    data,
    horario,
    descricao,
    local,
    numeroEComplemento,
    latitude,
    longitude,
    materiais,
    tarefas,
    mutiraoTipo,
  } = req.body;

  try {
    // verificação de tipo de mutirao
    if (!Object.values(MUTIRAO_TIPOS).includes(mutiraoTipo)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Tipo de mutirão inválidop" });
    }

    // Verifica se faltam menos de 48 horas para o mutirão
    const dataMutirao = new Date(`${data}T${horario}`);

    if (isNaN(dataMutirao.getTime())) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Formato de data ou horário inválido." });
    }

    const agora = new Date();
    const diferencaMs = dataMutirao.getTime() - agora.getTime();
    const horasQueFaltam = diferencaMs / (1000 * 60 * 60);

    if (horasQueFaltam < 48) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Não é possível criar um mutirão com menos de 48 horas de antecedência",
      });
    }

    // Validação dos dados de localização

    if (!local || local.trim() === "") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "O campo 'local' (endereço base) é obrigatório." });
    }
    if (!latitude || !longitude) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Latitude e longitude válidas são obrigatórias (selecione da lista).",
      });
    }

    const latNum = parseFloat(latitude); // Use latitudeString
    const lonNum = parseFloat(longitude); // Use longitudeString

    if (isNaN(latNum) || isNaN(lonNum)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Valores de latitude ou longitude inválidos." });
    }

    // Define a imagem padrão ou a enviada
    let imagePath = "/uploads/default.png";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // Salvando objeto location com GeoJSON
    let locationGeoJSON = {
      type: "Point",
      coordinates: [lonNum, latNum],
    };

    // Endereço final
    const enderecoFinal = mergeEndereco(local, numeroEComplemento);

    const mutirao = await Mutirao.create({
      titulo,
      data,
      horario,
      descricao,
      local: enderecoFinal,
      numeroEComplemento,
      materiais: Array.isArray(materiais)
        ? materiais
        : materiais
        ? [materiais]
        : [], // Verifica se é array. Se string, transforma em array, se vazio ou null, usa o fallback []
      tarefas: Array.isArray(tarefas) ? tarefas : tarefas ? [tarefas] : [],
      mutiraoTipo,
      criadoPor: req.user.userId,
      imagemCapa: imagePath,
      location: locationGeoJSON,
    });

    res.status(StatusCodes.CREATED).json({ mutirao });
  } catch (error) {
    console.error("Erro ao criar mutirão:", error);

    // Remove o arquivo se houve erro
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Erro ao criar mutirão",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

export const getMutirao = async (req, res) => {
  const {id} = req.params;
  const mutirao = await Mutirao.findById(id).populate("criadoPor", "nome _id");

  res.status(StatusCodes.OK).json({mutirao});
};

// Busca de mutirões inativos
export const getMutiroesInativos = async (req, res) => {
  const mutiroes = await Mutirao.find({
    criadoPor: req.user.userId,
    ativo: false,
  });
  res.status(StatusCodes.OK).json({mutiroes});
};

export const updateMutirao = async (req, res) => {
  const { id } = req.params;

  const {
    titulo,
    data,
    horario,
    descricao,
    local,
    numeroEComplemento,
    latitude,
    longitude,
    materiais,
    tarefas,
    mutiraoTipo,
  } = req.body;

  // Verifica se o usuário eh o criador ou admin
  const mutiraoExistente = await Mutirao.findById(id);
  if (!mutiraoExistente) {
    return res.status(404).json({msg: "Mutirão não encontrado"});
  }

  if (mutiraoExistente.criadoPor.toString() !== req.user.userId && !req.user.isAdmin) {
    return res.status(403).json({msg: "Não autorizado"});
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

  let enderecoBase;

  if (local && local.trim() !== "") {
    // remove any old numeroEComplemento from the user input 'local' just in case
    enderecoBase = removeNumeroFromLocal(
      local.trim(),
      mutiraoExistente.numeroEComplemento
    );
  } else {
    enderecoBase = removeNumeroFromLocal(
      mutiraoExistente.local,
      mutiraoExistente.numeroEComplemento
    );
  }

  const finalNumero =
    numeroEComplemento?.trim() || mutiraoExistente.numeroEComplemento;

  const enderecoFinal = mergeEndereco(enderecoBase, finalNumero);

  let locationGeoJSON = mutiraoExistente.location;
  if (latitude && longitude) {
    const latNum = parseFloat(latitude);
    const lonNum = parseFloat(longitude);
    if (!isNaN(latNum) && !isNaN(lonNum)) {
      locationGeoJSON = {
        type: "Point",
        coordinates: [lonNum, latNum],
      };
    }
  }

  const updatedMutirao = await Mutirao.findByIdAndUpdate(
    id,
    {
      titulo,
      data,
      horario,
      descricao,
      local: enderecoFinal,
      numeroEComplemento,
      materiais: Array.isArray(materiais)
        ? materiais
        : materiais
        ? [materiais]
        : [],
      tarefas: Array.isArray(tarefas) ? tarefas : tarefas ? [tarefas] : [],
      mutiraoTipo,
      imagemCapa: imagePath,
      location: locationGeoJSON,
    },
    { new: true }
  );

  //res.status(StatusCodes.OK).json({ mutirao: updatedMutirao }); NOVO

  /*const updatedMutirao = await Mutirao.findByIdAndUpdate(id, req.body, { new: true, }); ANTIGO*/

  res
    .status(StatusCodes.OK)
    .json({ msg: "Mutirão atualizado com sucesso!", mutirao: updatedMutirao });
};

export const deleteMutirao = async (req, res) => {
  const {id} = req.params;
  const updatedMutirao = await Mutirao.findByIdAndUpdate(
    id,
    {
      ativo: false,
      deletadoEm: new Date(),
    },
    {new: true}
  );

  res.status(StatusCodes.OK).json({
    message: "Mutirão marcado como inativo com sucesso!",
    mutirao: updatedMutirao,
  });
};

export const inscreverUsuario = async (req, res) => {
  const {id} = req.params;
  const {userId} = req.user;

  const usuario = await Usuario.findById(userId);
  if (!usuario) {
    return res.status(StatusCodes.NOT_FOUND).json({msg: "Usuário não encontrado"});
  }

  const multirao = await Mutirao.findByIdAndUpdate(id, {
    $addToSet: {inscritos: userId},
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: usuario.email,
    subject: "Inscrição confirmada no mutirão",
    text: `Olá ${usuario.nome},\n\nSua inscrição no mutirão ${multirao.titulo} foi realizada com sucesso!\n\nObrigado por participar!`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }

  res.status(StatusCodes.OK).json(`Usuário ${userId} inscrito com sucesso no mutirão ${id} !`);
};

export const cancelarInscricao = async (req, res) => {
  const {id} = req.params;
  const {userId} = req.user;
  const mutiraoInscricao = await Mutirao.findByIdAndUpdate(id, {
    $pull: {inscritos: userId},
  });
  res
    .status(StatusCodes.OK)
    .json(
      `Usuário ${userId} cancelou a inscrição no mutirão ${id} com sucesso!`
    );
};

// Helper Functions

function mergeEndereco(local, numeroEComplemento) {
  if (!local) return "";
  let enderecoFinal = local.trim();

  if (numeroEComplemento?.trim()) {
    const [mainPart, ...rest] = enderecoFinal.split(" - ");
    const mainWithNumber = `${mainPart.trim()}, ${numeroEComplemento.trim()}`;
    enderecoFinal =
      rest.length > 0
        ? `${mainWithNumber} - ${rest.join(" - ").trim()}`
        : mainWithNumber;
  }

  return enderecoFinal;
}

function removeNumeroFromLocal(local, numeroEComplemento) {
  if (!local || !numeroEComplemento) return local;

  const pattern = new RegExp(`,\\s*${escapeRegExp(numeroEComplemento.trim())}`);
  return local.replace(pattern, "").trim();
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
