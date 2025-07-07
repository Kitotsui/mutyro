import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/VisualizarMutirao";
import customFetch from "@/utils/customFetch";
import {
  LoaderFunctionArgs,
  useNavigate,
  useLoaderData,
  useLocation,
  useRevalidator,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import Modal from "../components/Modal";

interface Avaliacao {
  _id: string;
  usuario: {
    _id: string;
    nome: string;
  };
  nota: number;
  comentario: string;
  criadoEm: string;
}

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
  FaTasks,
  FaTools,
  FaLightbulb,
  FaCommentDots,
} from "react-icons/fa";

// Correção para que os ícones padrões do Leaflet carreguem corretamente com Vite
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import getImageUrl from "@/utils/imageUrlHelper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface LocationGeoJSON {
  type: "Point";
  coordinates: [number, number];
}

interface Mutirao {
  _id: string;
  titulo: string;
  data: string;
  horario: string;
  descricao: string;
  local: string;
  materiais?: string[];
  tarefas: string[];
  mutiraoStatus: string;
  mutiraoTipo: string;
  inscritos?: string[];
  criadoPor: CriadoPorInfo;
  imagemCapa: string;
  location: LocationGeoJSON;
  numeroEComplemento: string;
  finalizado?: boolean;
}

interface CriadoPorInfo {
  _id: string;
  nome: string;
}

interface VisualizarMutiraoLoaderData {
  mutirao: Mutirao;
  isInscrito: boolean;
  avaliacoes: Avaliacao[];
}

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<VisualizarMutiraoLoaderData> => {
  const { id } = params;

  if (!id) {
    throw new Response("Requisição inválida: ID do mutirão ausente na URL.", {
      status: 400,
    });
  }

  try {
    console.log(`Loader: Buscando mutirão ID: ${id}`);
    const response = await customFetch(`/mutiroes/${id}`);
    const mutirao = response.data.mutirao;
    if (!mutirao || !mutirao.location || !mutirao.location.coordinates) {
      console.error(
        "Loader: Dados de localização ausentes ou incompletos para o mutirão:",
        mutirao
      );
      throw new Response(
        "Dados de localização do mutirão ausentes ou incompletos.",
        { status: 404 }
      );
    }

    // Busca as avaliações
    const avaliacoesResponse = await customFetch(`/mutiroes/${id}/avaliacoes`);
    const avaliacoes = avaliacoesResponse.data.avaliacoes || [];

    let currentUserId: string | null = null;
    let isInscrito = false; // Default
    try {
      const userResponse = await customFetch("/usuarios/atual-usuario");
      currentUserId = userResponse.data.usuario._id;
    } catch (userError: unknown) {
      const error = userError as { response?: { status?: number } };
      console.warn(
        "Loader: Usuário não autenticado ou erro ao buscar usuário atual.",
        error?.response?.status
      );
    }

    if (currentUserId && mutirao.inscritos?.includes(currentUserId)) {
      isInscrito = true;
    }

    console.log("Loader: Mutirão carregado:", mutirao);
    console.log("Loader: Status inicial de inscrição:", isInscrito);

    return { mutirao, isInscrito, avaliacoes };
  } catch (error: unknown) {
    const err = error as { response?: { status?: number } };
    console.error(`Erro no loader ao buscar ID ${id}:`, err);
    const status = err?.response?.status;

    if (status === 404) {
      throw new Response("Mutirão não encontrado.", { status: 404 });
    }
    if (status === 400) {
      throw new Response("Requisição inválida.", { status: 400 });
    }
    if (status === 401 || status === 403) {
      throw new Response("Acesso não autorizado.", { status: status });
    }

    throw new Response("Erro ao carregar dados.", { status: status || 500 });
  }
};

import ShareMutirao from "@/components/ShareMutirao";

type MapWrapperProps = {
  mutirao: any;
  mapPosition: [number, number];
};

function MapWrapper({ mutirao, mapPosition }: MapWrapperProps) {
  return (
    <div
      key={`map-${mutirao._id}`} // Isso forçará o React a recriar o container se mudar
      style={{
        height: 250,
        borderRadius: 12,
        overflow: "hidden",
        marginTop: 10,
        border: "1px solid #eee",
      }}
    >
      <MapContainer
        center={mapPosition}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={mapPosition}>
          <Popup>
            {mutirao.local}
            {mutirao.numeroEComplemento && (
              <>
                <br />
                {mutirao.numeroEComplemento}
              </>
            )}
            <br />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mutirao.local}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir no Google Maps
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

const VisualizarMutirao = () => {
  const navigate = useNavigate();
  const {
    mutirao,
    isInscrito: initialIsInscrito,
    avaliacoes: initialAvaliacoes,
  } = useLoaderData() as VisualizarMutiraoLoaderData;

  const [showModal, setShowModal] = useState(false); // controlar o modal
  const [inscritos, setInscritos] = useState<
    { _id: string; nome: string; email: string }[]
  >([]); // armazenar os inscritos

  // Função para buscar inscritos
  const fetchInscritos = async () => {
    try {
      const response = await customFetch.get(
        `/mutiroes/${mutirao._id}/inscritos`
      );
      setInscritos(response.data.inscritos || []);
    } catch (error) {
      toast.error("Erro ao buscar inscritos.");
    }
  };

  // Carrega o usuário atual
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await customFetch("/usuarios/atual-usuario");
        setCurrentUser({
          _id: response.data.usuario._id,
          isAdmin: response.data.usuario.isAdmin,
        });
      } catch (error) {
        console.log("Usuário não autenticado");
      }
    };
    fetchCurrentUser();
  }, []);
  // Chama a função para buscar inscritos ao abrir o modal
  useEffect(() => {
    if (showModal) {
      fetchInscritos();
    }
  }, [showModal]);

  // Estados para avaliações
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>(
    initialAvaliacoes || []
  );
  const [minhaAvaliacao, setMinhaAvaliacao] = useState<{
    nota: number;
    comentario: string;
  }>({ nota: 3, comentario: "" });
  const [editandoAvaliacao, setEditandoAvaliacao] = useState<string | null>(
    null
  );

  // Função para formatar a data como "DD de mes de YYYY"
  const formatarDataExtensa = (dataISO: string): string => {
    const data = new Date(dataISO);
    const dia = data.getDate();
    const mes = data.toLocaleString("pt-BR", { month: "long" });
    const ano = data.getFullYear();
    return `${dia} de ${mes} de ${ano}`;
  };
  const dataFormatada = formatarDataExtensa(mutirao.data);

  // Estados para usuário e inscrição
  const [currentUser, setCurrentUser] = useState<{
    _id: string;
    isAdmin: boolean;
  } | null>(null);

  const [isInscrito, setIsInscrito] = useState(initialIsInscrito);
  const [aceitouTermo, setAceitouTermo] = useState(false);
  // const [habilidades, setHabilidades] = useState<Habilidade[]>([
  //   { nome: "NÃO IMPLEMENTADO", checked: false },
  // ]);

  const [materiaisSelecionados, setMateriaisSelecionados] = useState<{
    [key: string]: boolean;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Funções para manipulação de avaliações
  const handleCriarAvaliacao = async () => {
    try {
      const response = await customFetch.post(
        `/mutiroes/${mutirao._id}/avaliacoes`,
        {
          nota: minhaAvaliacao.nota,
          comentario: minhaAvaliacao.comentario,
        }
      );

      setAvaliacoes([...avaliacoes, response.data.avaliacao]);
      setMinhaAvaliacao({ nota: 5, comentario: "" });
      toast.success("Avaliação enviada com sucesso!");
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Erro ao enviar avaliação");
    }
  };

  const handleAtualizarAvaliacao = async (avaliacaoId: string) => {
    try {
      const response = await customFetch.patch(
        `/mutiroes/${mutirao._id}/avaliacoes/${avaliacaoId}`,
        {
          nota: minhaAvaliacao.nota,
          comentario: minhaAvaliacao.comentario,
        }
      );

      setAvaliacoes(
        avaliacoes.map((av) =>
          av._id === avaliacaoId ? response.data.avaliacao : av
        )
      );
      setEditandoAvaliacao(null);
      setMinhaAvaliacao({ nota: 3, comentario: "" });
      toast.success("Avaliação atualizada com sucesso!");
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Erro ao atualizar avaliação");
    }
  };

  const handleDeletarAvaliacao = async (avaliacaoId: string) => {
    try {
      await customFetch.delete(
        `/mutiroes/${mutirao._id}/avaliacoes/${avaliacaoId}`
      );
      setAvaliacoes(avaliacoes.filter((av) => av._id !== avaliacaoId));
      toast.success("Avaliação removida com sucesso!");
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Erro ao remover avaliação");
    }
  };

  const location = useLocation(); // Para retornar para a página de mutirão após logar / cadastrar
  const { usuario: authContextUsuario } = useAuth();
  const revalidator = useRevalidator();

  // Atualiza isInscrito quando authContextUsuario ou mutirao.inscritos mudam
  useEffect(() => {
    if (authContextUsuario && mutirao?.inscritos) {
      setIsInscrito(mutirao.inscritos.includes(authContextUsuario._id));
    } else {
      setIsInscrito(false);
    }
  }, [authContextUsuario, mutirao?.inscritos]);

  // Inicializa materiais selecionados
  useEffect(() => {
    if (mutirao?.materiais && Array.isArray(mutirao.materiais)) {
      const estadoInicial = mutirao.materiais.reduce((acc, nomeMaterial) => {
        acc[nomeMaterial] = false; // Começa desmarcado
        return acc;
      }, {} as { [key: string]: boolean });
      setMateriaisSelecionados(estadoInicial);
    } else {
      setMateriaisSelecionados({});
    }
  }, [mutirao?.materiais]);

  // const handleHabilidadeChange = (index: number) => {
  //   const novasHabilidades = [...habilidades];
  //   novasHabilidades[index].checked = !novasHabilidades[index].checked;
  //   setHabilidades(novasHabilidades);
  // };

  const handleMaterialChange = (nomeMaterial: string) => {
    setMateriaisSelecionados((estadoAnterior) => ({
      ...estadoAnterior,
      [nomeMaterial]: !estadoAnterior[nomeMaterial],
    }));
  };

  const handleInscricao = async () => {
    if (!aceitouTermo) {
      toast.warn(
        "Por favor, aceite o termo de participação antes de se inscrever."
      );
      return;
    }

    if (isSubmitting) return; // Evitar cliques duplos

    setIsSubmitting(true); // Inicia o feedback de carregamento

    try {
      if (!isInscrito) {
        await customFetch.post(`/mutiroes/${mutirao._id}/inscrever`);
        toast.success("Inscrição realizada com sucesso!");
      } else {
        await customFetch.delete(`/mutiroes/${mutirao._id}/cancelar`);
        // setIsInscrito(false);
        toast.success("Inscrição cancelada.");
      }
      revalidator.revalidate(); // REVALIDATE LOADER para atualizar 'mutirao.inscritos' e 'initialIsInscrito'
    } catch (error: unknown) {
      console.error("Erro ao processar inscrição/cancelamento:", error);
      const apiError = error as {
        response?: { data?: { msg?: string } };
        message?: string;
      };
      toast.error(
        apiError?.response?.data?.msg ||
          apiError?.message ||
          "Erro ao processar inscrição."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExcluirMutirao = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este mutirão?")) {
      return;
    }

    try {
      setIsSubmitting(true);
      await customFetch.delete(`/mutiroes/${mutirao._id}`);
      toast.success("Mutirão excluído com sucesso!");
      navigate("/user"); // Redireciona para a página do usuário após exclusão
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { msg?: string } };
        message?: string;
      };
      const errorMsg =
        err.response?.data?.msg || err.message || "Erro ao excluir mutirão";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verifica se o usuário pode participar (não é o criador e não está inscrito)
  const faltamMenosDe48Horas = (
    dataString: string,
    horarioString?: string
  ): boolean => {
    if (!horarioString) {
      // Se não houver horário, considere apenas a data
      const dataMutirao = new Date(dataString);
      const agora = new Date();
      return dataMutirao.getTime() - agora.getTime() < 48 * 60 * 60 * 1000;
    }

    // Dara e horario levados em consideracao
    const dataHoraMutirao = new Date(`${dataString}T${horarioString}`);
    const agora = new Date();
    return dataHoraMutirao.getTime() - agora.getTime() < 48 * 60 * 60 * 1000;
  };

  // Verifica se o usuário pode editar (criador ou admin)
  const podeEditar =
    authContextUsuario &&
    (authContextUsuario._id === mutirao.criadoPor._id ||
      authContextUsuario.isAdmin) &&
    !faltamMenosDe48Horas(mutirao.data, mutirao.horario);
  const podeParticipar =
    authContextUsuario && authContextUsuario._id !== mutirao.criadoPor._id;

  // Dados para o mapa
  const mapPosition: [number, number] = mutirao.location?.coordinates
    ? [mutirao.location.coordinates[1], mutirao.location.coordinates[0]]
    : [0, 0];

  // Verifica os dados de geolocalização
  const canDisplayMap =
    mutirao.location &&
    mutirao.location.coordinates &&
    mutirao.location.coordinates.length === 2;

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

  // --- NOVO LAYOUT ---
  return (
    <Wrapper>
      <div className="main-container">
        <div className="mutirao-card">
          {/* TOPO DESTACADO */}
          <div
            className="mutirao-header"
            data-bg={
              defaultImages[mutirao.mutiraoTipo] || defaultImages.FALLBACK
            }
            style={{
              ["--bg-url" as any]: `url(${
                defaultImages[mutirao.mutiraoTipo] || defaultImages.FALLBACK
              })`,
            }}
          >
            <div className="header-content">
              <img
                src={getImageUrl(mutirao.imagemCapa)}
                alt={`Imagem do mutirão: ${mutirao.titulo}`}
                className="mutirao-img"
              />
              <div className="org-info">
                <span className="org-label">Organizado por</span>
                <span className="org-name">
                  {typeof mutirao.criadoPor === "string"
                    ? mutirao.criadoPor
                    : mutirao.criadoPor?.nome ?? "Organizador desconhecido"}
                </span>
                <span className="org-extra">
                  <FaUsers /> {mutirao.inscritos?.length || 0} voluntários
                </span>
              </div>
            </div>
          </div>

          {/* CONTEÚDO PRINCIPAL */}
          <div className="mutirao-content">
            {/* COLUNA PRINCIPAL */}
            <div className="mutirao-main">
              <div className="mutirao-title-row">
                <h1>{mutirao.titulo}</h1>
                <div className="badges">
                  <span className="badge ativo">Ativo</span>
                  <span className="badge restante">15 dias restantes</span>
                </div>
              </div>
              <div className="mutirao-info-row">
                <span className="info-item">
                  <FaCalendarAlt /> {dataFormatada}
                </span>
                <span className="info-item">
                  <FaClock /> {mutirao.horario}
                </span>
                <span className="info-item">
                  <button
                    className={`back-btn ${
                      currentUser &&
                      (currentUser._id === mutirao.criadoPor._id ||
                        currentUser.isAdmin)
                        ? "clickable"
                        : ""
                    }`}
                    onClick={() => {
                      if (
                        currentUser &&
                        (currentUser._id === mutirao.criadoPor._id ||
                          currentUser.isAdmin)
                      ) {
                        setShowModal(true); // Abre o modal apenas para o criador ou admin
                      }
                    }}
                    disabled={
                      !currentUser ||
                      !(
                        currentUser._id === mutirao.criadoPor._id ||
                        currentUser.isAdmin
                      )
                    }
                  >
                    <FaUsers /> {mutirao.inscritos?.length || 0} voluntários
                  </button>
                </span>
              </div>
              <div className="card-section">
                <h3>
                  <FaTasks /> Descrição
                </h3>
                <p>{mutirao.descricao}</p>
              </div>
              <div className="card-section">
                <h3>
                  <FaMapMarkerAlt /> Local
                </h3>
                <p className="section-description">{mutirao.local}</p>
                {canDisplayMap && mapPosition ? (
                  <MapWrapper mutirao={mutirao} mapPosition={mapPosition} />
                ) : (
                  <p style={{ color: "#aaa", marginTop: 8 }}>
                    Localização não disponível no mapa.
                  </p>
                )}
              </div>
              <div className="card-section">
                <h3>
                  <FaTasks /> Tarefas
                </h3>
                <p className="section-description">
                  Atividades que serão desenvolvidas no evento
                </p>
                <div className="task-list">
                  {mutirao.tarefas.map((tarefa, index) => (
                    <div key={index} className="task-item">
                      {tarefa}
                    </div>
                  ))}
                </div>
              </div>
              {/* <div className="card-section">
                <h3>
                  <FaTools /> Habilidades
                </h3>
                <p className="section-description">
                  Selecione pelo menos uma habilidade
                </p>
                <div className="checkbox-list">
                  {habilidades.map((habilidade, index) => (
                    <label key={index} className="checkbox-item">
                      <span>{habilidade.nome}</span>
                      <input
                        type="checkbox"
                        checked={habilidade.checked}
                        disabled={true} // Remover quando implementar
                        onChange={() => handleHabilidadeChange(index)}
                      />
                    </label>
                  ))}
                </div>
              </div> */}
              <div className="card-section">
                <h3>
                  <FaTools /> Materiais e Ferramentas
                </h3>
                <p className="section-description">
                  Selecione caso possa trazer os seguintes itens
                </p>
                <div className="checkbox-list">
                  {/* Verifica se é array e não está vazio */}
                  {mutirao.materiais &&
                  Array.isArray(mutirao.materiais) &&
                  mutirao.materiais.length > 0 ? (
                    mutirao.materiais.map((nomeMaterial) => (
                      <label key={nomeMaterial} className="checkbox-item">
                        <span>{nomeMaterial}</span>
                        <input
                          type="checkbox"
                          checked={materiaisSelecionados[nomeMaterial] || false}
                          onChange={() => handleMaterialChange(nomeMaterial)}
                        />
                      </label>
                    ))
                  ) : (
                    <p>Nenhum material específico listado para este mutirão.</p>
                  )}
                </div>
              </div>
              <div className="card-section">
                <h3>
                  <FaCommentDots /> Comentários
                </h3>
                <div className="section">
                  <div className="form-section">
                    {mutirao.finalizado ? (
                      <>
                        {currentUser && isInscrito && (
                          <div className="avaliar-container">
                            <h3>Sua avaliação</h3>

                            <div className="form-group">
                              <label htmlFor="nota-avaliacao">Nota (1-5)</label>
                              <select
                                id="nota-avaliacao"
                                name="nota-avaliacao"
                                value={minhaAvaliacao.nota}
                                onChange={(e) =>
                                  setMinhaAvaliacao({
                                    ...minhaAvaliacao,
                                    nota: parseInt(e.target.value),
                                  })
                                }
                                required
                              >
                                <option value="">Selecione uma nota</option>
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="form-group">
                              <label htmlFor="comentario">
                                Comentário (opcional)
                              </label>
                              <textarea
                                id="comentario"
                                name="comentario"
                                value={minhaAvaliacao.comentario}
                                onChange={(e) =>
                                  setMinhaAvaliacao({
                                    ...minhaAvaliacao,
                                    comentario: e.target.value,
                                  })
                                }
                                placeholder="Deixe seu feedback sobre o mutirão"
                                maxLength={500}
                              />
                            </div>

                            <div className="button-group">
                              {editandoAvaliacao ? (
                                <>
                                  <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setEditandoAvaliacao(null)}
                                  >
                                    Cancelar
                                  </button>
                                  <button
                                    type="button"
                                    className="submit-btn"
                                    onClick={() =>
                                      handleAtualizarAvaliacao(
                                        editandoAvaliacao
                                      )
                                    }
                                  >
                                    Atualizar Avaliação
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  className="submit-btn"
                                  onClick={handleCriarAvaliacao}
                                >
                                  Enviar Avaliação
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="avaliacoes-list">
                          {avaliacoes.length > 0 ? (
                            avaliacoes.map((avaliacao) => (
                              <div
                                key={avaliacao._id}
                                className="avaliacao-item"
                              >
                                <div className="avaliacao-header">
                                  <h4>
                                    {avaliacao.usuario?.nome ??
                                      "Usuário desconhecido"}
                                  </h4>

                                  <div className="rating">
                                    {/* Nota: {avaliacao.nota}/5 */}
                                    {Array(avaliacao.nota).fill("★").join("")}
                                  </div>

                                  {currentUser?.isAdmin ||
                                  currentUser?._id ===
                                    avaliacao.usuario?._id ? (
                                    <div className="avaliacao-actions">
                                      <button
                                        type="button"
                                        className="edit-btn"
                                        onClick={() => {
                                          setEditandoAvaliacao(avaliacao._id);
                                          setMinhaAvaliacao({
                                            nota: avaliacao.nota,
                                            comentario: avaliacao.comentario,
                                          });
                                        }}
                                      >
                                        Editar
                                      </button>
                                      <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={() =>
                                          handleDeletarAvaliacao(avaliacao._id)
                                        }
                                      >
                                        Excluir
                                      </button>
                                    </div>
                                  ) : null}
                                </div>

                                {avaliacao.comentario && (
                                  <p className="comentario">
                                    {avaliacao.comentario}
                                  </p>
                                )}

                                <small className="avaliacao-date">
                                  {new Date(
                                    avaliacao.criadoEm
                                  ).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </small>
                              </div>
                            ))
                          ) : (
                            <p className="no-avaliacoes">
                              Nenhuma avaliação ainda.
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="avaliacoes-disabled">
                        As avaliações estarão disponíveis após a conclusão do
                        mutirão.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* COLUNA LATERAL */}
            <div className="mutirao-side">
              <div className="side-card">
                <h3>Progresso de Participação</h3>
                <div className="side-progress">
                  <div className="progress-label">
                    <span>Voluntários</span>
                    <span>{mutirao.inscritos?.length || 0}/60</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${Math.min(
                          100,
                          ((mutirao.inscritos?.length || 0) / 60) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Se não estiver logado, exibe só os botões de cadastro e voltar */}
              {!authContextUsuario ? (
                <div
                  className="side-card"
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <button
                    className="submit-btn"
                    onClick={() =>
                      navigate(location.pathname, {
                        state: {
                          showRegisterModal: true,
                          from: location.pathname,
                        },
                        replace: true,
                      })
                    }
                  >
                    Cadastre-se para poder participar
                  </button>
                  <button
                    className="back-btn"
                    onClick={() => navigate("/user")}
                  >
                    Voltar
                  </button>
                </div>
              ) : (
                <>
                  <div className="side-card">
                    {authContextUsuario &&
                      authContextUsuario._id !== mutirao.criadoPor._id && (
                        <>
                          <h3>Termo de Aceitação</h3>
                          <div className="side-termo">
                            Eu concordo em participar deste mutirão de forma
                            voluntária, contribuindo com minhas habilidades e
                            seguindo as orientações dos organizadores. Entendo
                            que o objetivo é desenvolver melhorias para a
                            comunidade e, se necessário, trarei meus próprios
                            equipamentos para colaborar. Comprometo-me a agir
                            com respeito, responsabilidade e colaboração,
                            garantindo um ambiente seguro e inclusivo para todos
                            os participantes.
                          </div>
                          <label className="side-checkbox">
                            <input
                              type="checkbox"
                              checked={aceitouTermo}
                              onChange={(e) =>
                                setAceitouTermo(e.target.checked)
                              }
                            />
                            <span>Aceito os termos e condições</span>
                          </label>
                        </>
                      )}
                    <div className="side-btns">
                      {podeParticipar && (
                        <button
                          className={`submit-btn${
                            !aceitouTermo || isSubmitting ? " disabled" : ""
                          }`}
                          onClick={handleInscricao}
                          disabled={!aceitouTermo || isSubmitting}
                        >
                          {isSubmitting
                            ? "Processando..."
                            : isInscrito
                            ? "Cancelar Participação"
                            : "Quero Ser Voluntário"}
                        </button>
                      )}
                      {podeEditar && (
                        <button
                          className="submit-btn"
                          style={{ background: "var(--primary-300)" }}
                          onClick={() =>
                            navigate(`/mutirao/${mutirao._id}/editar`)
                          }
                          disabled={isSubmitting}
                        >
                          Editar
                        </button>
                      )}
                      {authContextUsuario &&
                        (authContextUsuario._id === mutirao.criadoPor._id ||
                          authContextUsuario.isAdmin) && (
                          <button
                            className="back-btn"
                            onClick={handleExcluirMutirao}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Processando..." : "Excluir"}
                          </button>
                        )}
                      <button
                        className="back-btn"
                        onClick={() => navigate("/user")}
                      >
                        Voltar
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="side-card share-card">
                <div className="share-row">
                  <ShareMutirao
                    url={`${window.location.origin}/mutirao/${mutirao._id}`}
                    titulo={mutirao.titulo}
                  />
                </div>
              </div>
              <div className="side-card side-dica">
                <FaLightbulb className="dica-icon" />
                <div className="dica-content">
                  <h4>Dica</h4>
                  <p>
                    Traga uma garrafa d'água e use roupas confortáveis para o
                    trabalho voluntário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={mutirao.titulo}
        isOpen={showModal}
        onClose={() => setShowModal(false)} // Fecha o modal
      >
        {inscritos.length > 0 ? (
          <ul>
            {inscritos.map((inscrito) => (
              <li key={inscrito._id} className="inscrito-item">
                <input type="checkbox" className="checkbox" />
                <span className="inscrito-nome">{inscrito.nome}</span>
                <span className="inscrito-email">{inscrito.email}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum inscrito neste mutirão.</p>
        )}
      </Modal>
    </Wrapper>
  );
};

export default VisualizarMutirao;
