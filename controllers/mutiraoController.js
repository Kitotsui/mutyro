import { StatusCodes } from "http-status-codes";
import Mutirao from "../models/mutiraoModel.js";
import Usuario from "../models/usuarioModel.js";
import { MUTIRAO_TIPOS } from "../utils/constantes.js";
import fs from "fs/promises";
import Notificacao from "../models/Notificacao.js";
import { criarNotificacaoPadronizada } from '../utils/notificacaoUtils.js';

import nodemailer from "nodemailer";
import usuarioModel from "../models/usuarioModel.js";

export const getMutiroes = async (req, res) => {
  //console.log(req.user);
  const mutiroes = await Mutirao.find({
    criadoPor: req.user.userId,
    ativo: true,
  }); // Busca todos os mutirões do usuário logado que estao ativos
  res.status(StatusCodes.OK).json({ mutiroes });
};

export const getTodosMutiroes = async (req, res) => {
  const { search } = req.query; // Recebe um termo de busca do front (ex.: /mutiroes/todos?search=limpeza)

  console.log(`[ATLAS SEARCH] Buscando o termo: ${search}`);

  let mutiroes;

  if (search && search.trim() !== "") {
    // Usa o Atlas Search se houver um termo de busca
    mutiroes = await Mutirao.aggregate([
      {
        $search: {
          index: "default", // Aqui é o nome do Index criado no Atlas Search Index
          text: {
            query: search,
            path: ["titulo", "descricao"],
            fuzzy: {
              maxEdits: 1, // Número de erros de digitação permitidos
              prefixLength: 2, // O número de primeiros caracteres que devem estar corretos
            },
          },
        },
      },
      {
        // Depois da busca, filtra conforme a linha abaixo
        $match: { ativo: true },
      },
      // $lookup substituiu populate('criadoPor', 'nome') para compatibilidade
      {
        $lookup: {
          from: "usuarios", // nome da coleção
          localField: "criadoPor",
          foreignField: "_id",
          as: "criadoPorInfo",
        },
      },
      {
        $unwind: { path: "$criadoPorInfo", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          "criadoPor.nome": "$criadoPorInfo.nome",
          "criadoPor._id": "$criadoPorInfo._id",
        },
      },
      {
        $project: { criadoPorInfo: 0 },
      },
    ]);
  } else {
    // Se não houver tempo de busca, usa a lógica anterior à da implementação do Atlas Search
    mutiroes = await Mutirao.find({ ativo: true }).populate(
      "criadoPor",
      "nome"
    );
  }

  res.status(StatusCodes.OK).json({ mutiroes });
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

    const defaultImages = {
      SOCIAL:
        "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/social_w337yo.jpg",
      SAUDE:
        "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/saude_jxyour.jpg",
      CONSTRUCAO_REFORMA:
        "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/construcao_llhyii.avif",
      AMBIENTAL_AGRICOLA:
        "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/ambiental_upuyed.avif",
      CULTURA_EDUCACAO:
        "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/educacao_zs4ywz.avif",
      TECNOLOGIA:
        "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033683/tecnologia_o5ui0u.avif",
      FALLBACK:
        "https://res.cloudinary.com/dunfagpl8/image/upload/v1750033758/mutyrologo_bz2kon.png",
    };

    // Define a imagem padrão ou a enviada
    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
    } else {
      const tipo = req.body.mutiraoTipo;
      imagePath = defaultImages[tipo] || defaultImages.FALLBACK;
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
  let imagePath = mutiraoExistente.imagemCapa; // Mantém o mesmo caminho antigo por padrão
  if (req.file) {
    imagePath = req.file.path; // Se uma nova imagem for enviada, usa o Cloudinary
    // TODO: Implementar remoção da imagem antiga no Cloudinary com o public_id
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

  const usuario = await usuarioModel.findById(userId);
  if (!usuario) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Usuário não encontrado" });
  }

  const multirao = await Mutirao.findByIdAndUpdate(
    id,
    {
      $addToSet: { inscritos: userId },
    },
    { new: true }
  );

  // LOG PARA DEPURAÇÃO
  console.log(
    "Tentando criar notificação para usuário:",
    userId,
    "no mutirão:",
    multirao.titulo
  );
  await Notificacao.create(
    criarNotificacaoPadronizada({
      usuarioId: userId,
      tipo: "inscricao_confirmada",
      variaveis: {
        mutirao: multirao.titulo,
        data: multirao.data,
        horario: multirao.horario,
        local: multirao.local
      },
      mutiraoId: multirao._id
    })
  );
  console.log("Notificação criada com sucesso!");

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

  res
    .status(StatusCodes.OK)
    .json(`Usuário ${userId} inscrito com sucesso no mutirão ${id} !`);
};

export const cancelarInscricao = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  // Buscar o mutirão atualizado para garantir que o campo titulo está presente
  const mutiraoInscricao = await Mutirao.findById(id);
  if (!mutiraoInscricao) {
    return res.status(404).json({ msg: "Mutirão não encontrado" });
  }
  // Remover o usuário dos inscritos
  await Mutirao.findByIdAndUpdate(id, {
    $pull: { inscritos: userId },
  });
  // Cria notificação de cancelamento
  await Notificacao.create(
    criarNotificacaoPadronizada({
      usuarioId: userId,
      tipo: "inscricao_cancelada",
      variaveis: { mutirao: mutiraoInscricao.titulo },
      mutiraoId: mutiraoInscricao._id
    })
  );
  res
    .status(StatusCodes.OK)
    .json(
      `Usuário ${userId} cancelou a inscrição no mutirão ${id} com sucesso!`
    );
};

//INSCRITOS
export const getInscritos = async (req, res) => {
  const { id } = req.params;

  try {
    // Busca o mutirão e popula os inscritos com os campos necessários
    const mutirao = await Mutirao.findById(id).populate(
      "inscritos",
      "_id nome email"
    );

    if (!mutirao) {
      return res.status(404).json({ msg: "Mutirão não encontrado" });
    }

    // Retorna apenas os inscritos
    res.status(200).json({ inscritos: mutirao.inscritos });
  } catch (error) {
    console.error("Erro ao buscar inscritos:", error);
    res.status(500).json({ msg: "Erro ao buscar inscritos" });
  }
};

//AVALIACOES
export const getAvaliacoes = async (req, res) => {
  const { id } = req.params;
  const mutirao = await Mutirao.findById(id)
    .populate("avaliacoes.usuario", "nome")
    .select("avaliacoes");

  if (!mutirao) {
    return res.status(404).json({ msg: "Mutirão não encontrado" });
  }

  res.status(200).json({ avaliacoes: mutirao.avaliacoes });
};

export const criarAvaliacao = async (req, res) => {
  const { id } = req.params;
  const { nota, comentario } = req.body;
  const { userId } = req.user;

  // Verifica se o mutirão existe e está finalizado
  const mutirao = await Mutirao.findById(id);
  if (!mutirao) {
    return res.status(404).json({ msg: "Mutirão não encontrado" });
  }

  if (!mutirao.finalizado) {
    return res
      .status(400)
      .json({ msg: "Este mutirão ainda não foi finalizado" });
  }

  // Verifica se o usuário está inscrito no mutirão
  if (!mutirao.inscritos.includes(userId)) {
    return res
      .status(403)
      .json({ msg: "Apenas participantes podem avaliar este mutirão" });
  }

  // Verifica se o usuário já avaliou
  const jaAvaliou = mutirao.avaliacoes.some(
    (av) => av.usuario.toString() === userId
  );
  if (jaAvaliou) {
    return res.status(400).json({ msg: "Você já avaliou este mutirão" });
  }

  // Cria a avaliação
  const novaAvaliacao = {
    usuario: userId,
    nota,
    comentario: comentario || "",
  };

  mutirao.avaliacoes.push(novaAvaliacao);
  await mutirao.save();

  res
    .status(201)
    .json({ msg: "Avaliação criada com sucesso", avaliacao: novaAvaliacao });
};

export const atualizarAvaliacao = async (req, res) => {
  const { id, avaliacaoId } = req.params;
  const { nota, comentario } = req.body;
  const { userId } = req.user;

  const mutirao = await Mutirao.findById(id);
  if (!mutirao) {
    return res.status(404).json({ msg: "Mutirão não encontrado" });
  }

  const avaliacao = mutirao.avaliacoes.id(avaliacaoId);
  if (!avaliacao) {
    return res.status(404).json({ msg: "Avaliação não encontrada" });
  }

  // Verifica se o usuário é o autor da avaliação
  if (avaliacao.usuario.toString() !== userId) {
    return res.status(403).json({ msg: "Não autorizado" });
  }

  // Atualiza a avaliação
  avaliacao.nota = nota;
  avaliacao.comentario = comentario || "";
  await mutirao.save();

  res.status(200).json({ msg: "Avaliação atualizada com sucesso", avaliacao });
};

export const deletarAvaliacao = async (req, res) => {
  const { id, avaliacaoId } = req.params;
  const { userId } = req.user;

  const mutirao = await Mutirao.findById(id);
  if (!mutirao) {
    return res.status(404).json({ msg: "Mutirão não encontrado" });
  }

  const avaliacao = mutirao.avaliacoes.id(avaliacaoId);
  if (!avaliacao) {
    return res.status(404).json({ msg: "Avaliação não encontrada" });
  }

  // Verifica se o usuário é o autor da avaliação ou admin
  if (avaliacao.usuario.toString() !== userId && !req.user.isAdmin) {
    return res.status(403).json({ msg: "Não autorizado" });
  }

  // Remove a avaliação
  mutirao.avaliacoes.pull(avaliacaoId);
  await mutirao.save();

  res.status(200).json({ msg: "Avaliação removida com sucesso" });
};

export const finalizarMutirao = async () => {
  const agora = new Date();
  const mutiroesNaoFinalizados = await Mutirao.find({
    finalizado: false,
    data: { $lt: agora },
  });

  let marcados = 0;

  for (const mutirao of mutiroesNaoFinalizados) {
    const dataHoraMutirao = new Date(
      `${mutirao.data}T${mutirao.horario || "00:00"}`
    );
    if (dataHoraMutirao < agora) {
      mutirao.finalizado = true;
      await mutirao.save();
      marcados++;
    }
  }

  return {
    total: mutiroesNaoFinalizados.length,
    marcados: marcados,
  };
};

export const getMutiroesAvaliados = async (req, res) => {
  try {
    const mutiroesComAvaliacao = await Mutirao.aggregate([
      {
        $match: {
          finalizado: true,
          "avaliacoes.comentario": { $exists: true, $ne: "" },
        },
      },
      { $sort: { data: -1 } },
      { $limit: 15 },
      {
        $addFields: {
          averageRating: { $avg: "$avaliacoes.nota" },
        },
      },
      {
        $addFields: {
          totalReviews: { $size: "$avaliacoes" },
        },
      },
    ]);

    // const mutiroesComComentarios = await Mutirao.find({
    //   finalizado: true,
    //   "avaliacoes.comentario": { $exists: true, $ne: "" }, // Busca mutirões com pelo menos um comentário
    // })
    //   .sort({ data: -1 }) // Ordenação de mais recentemente finalizados primeiro
    //   .limit(15) // Número de resultados
    //   .populate("avaliacoes.usuario", "nome");

    // if (!mutiroesComComentarios || mutiroesComComentarios.length === 0) {
    //   return res.status(StatusCodes.OK).json({ avaliados: [] });
    // }

    const populatedMutiroes = await Mutirao.populate(mutiroesComAvaliacao, {
      path: "avaliacoes.usuario",
      select: "nome",
    });

    if (!populatedMutiroes || populatedMutiroes.length === 0) {
      return res.status(StatusCodes.OK).json({ avaliados: [] });
    }

    const avaliados = populatedMutiroes
      .map((mutirao) => {
        const avaliacoesValidas = mutirao.avaliacoes.filter(
          (a) => a.comentario && a.comentario.trim() !== ""
        );

        if (avaliacoesValidas.length === 0) return null;

        const randomAvaliacao =
          avaliacoesValidas[
            Math.floor(Math.random() * avaliacoesValidas.length)
          ];

        return {
          mutiraoId: mutirao._id,
          mutiraoTitulo: mutirao.titulo,
          mutiraoImagemCapa: mutirao.imagemCapa,
          comentario: randomAvaliacao.comentario,
          autorComentario: randomAvaliacao.usuario?.nome || "Anônimo",
          mutiraoTipo: mutirao.mutiraoTipo,
          averageRating: mutirao.averageRating,
          totalReviews: mutirao.totalReviews,
        };
      })
      .filter(Boolean);

    res.status(StatusCodes.OK).json({ avaliados });
  } catch (error) {
    console.error("Erro ao buscar histórias de sucesso: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Erro no servidor ao buscar histórias de sucesso." });
  }
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
