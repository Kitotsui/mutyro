import { useState, useEffect } from "react";
import { LoaderFunctionArgs, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/VisualizarMutirao";
import customFetch from "@/utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- FIX DEFAULT MARKER ICON ---
// Correção para que os ícones padrões do Leaflet carreguem corretamente com Vite
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
// @ts-ignore: This is a common workaround for a Leaflet/bundler issue.
delete L.Icon.Default.prototype._getIconUrl;
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
}

interface CriadoPorInfo {
  _id: string;
  nome: string;
}

interface Habilidade {
  nome: string;
  checked: boolean;
}

interface Material {
  nome: string;
  checked: boolean;
}

interface VisualizarMutiraoLoaderData {
  mutirao: Mutirao;
  isInscrito: boolean;
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

    let currentUserId: string | null = null;
    let isInscrito = false; // Default
    try {
      const userResponse = await customFetch("/usuarios/atual-usuario");
      currentUserId = userResponse.data.usuario._id;
    } catch (userError: any) {
      console.warn(
        "Loader: Usuário não autenticado ou erro ao buscar usuário atual.",
        userError?.response?.status
      );
    }

    if (currentUserId && mutirao.inscritos?.includes(currentUserId)) {
      isInscrito = true;
    }

    console.log("Loader: Mutirão carregado:", mutirao);
    console.log("Loader: Status inicial de inscrição:", isInscrito);

    return { mutirao, isInscrito };
  } catch (error: any) {
    console.error(`Erro no loader ao buscar ID ${id}:`, error);
    const status = error?.response?.status;

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

const VisualizarMutirao = () => {
  const navigate = useNavigate();
  const { mutirao, isInscrito: initialIsInscrito } =
    useLoaderData() as VisualizarMutiraoLoaderData;

  // Função para formatar a data como "DD de mes de YYYY"
  const formatarDataExtensa = (dataISO: string): string => {
    const data = new Date(dataISO);
    const dia = data.getDate();
    const mes = data.toLocaleString("pt-BR", { month: "long" });
    const ano = data.getFullYear();
    return `${dia} de ${mes} de ${ano}`;
  };
  const dataFormatada = formatarDataExtensa(mutirao.data);

  // constante p/ gerenciar o usuário atual
  const [currentUser, setCurrentUser] = useState<{
    _id: string;
    isAdmin: boolean;
  } | null>(null);

  const [isInscrito, setIsInscrito] = useState(false);
  const [aceitouTermo, setAceitouTermo] = useState(false);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([
    { nome: "NÃO IMPLEMENTADO", checked: false },
  ]);

  const [materiaisSelecionados, setMateriaisSelecionados] = useState<{
    [key: string]: boolean;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleHabilidadeChange = (index: number) => {
    const novasHabilidades = [...habilidades];
    novasHabilidades[index].checked = !novasHabilidades[index].checked;
    setHabilidades(novasHabilidades);
  };

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

    // Pega os materiais selecionados (mesmo que não vá enviar agora)
    const materiaisSelecionadosNomes = Object.entries(materiaisSelecionados)
      .filter(([nome, selecionado]) => selecionado)
      .map(([nome, selecionado]) => nome);
    console.log(
      "Materiais selecionados (NÃO enviados nesta versão):",
      materiaisSelecionadosNomes
    );
    // const habilidadesSelecionadasNomes = habilidades.filter(h => h.checked).map(h => h.nome);
    // console.log("Habilidades selecionadas (NÃO enviadas):", habilidadesSelecionadasNomes);

    try {
      if (!isInscrito) {
        await customFetch.post(`/mutiroes/${mutirao._id}/inscrever`);
        setIsInscrito(true);
        alert("Inscrição realizada com sucesso!");
      } else {
        await customFetch.delete(`/mutiroes/${mutirao._id}/cancelar`);
        setIsInscrito(false);
        alert("Inscrição cancelada.");
      }
    } catch (error) {
      console.error("Erro ao processar inscrição/cancelamento:", error);
      alert(`Ocorreu um erro: ${error || "Tente novamente."}`);
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
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.msg || error.message || "Erro ao excluir mutirão";
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
    currentUser &&
    (currentUser._id === mutirao.criadoPor._id || currentUser.isAdmin) &&
    !faltamMenosDe48Horas(mutirao.data, mutirao.horario);
  const podeParticipar =
    currentUser && currentUser._id !== mutirao.criadoPor._id;

  // Dados para o mapa
  const mapPosition: [number, number] = mutirao.location?.coordinates
    ? [mutirao.location.coordinates[1], mutirao.location.coordinates[0]]
    : [0, 0];

  // Verifica os dados de geolocalização
  const canDisplayMap =
    mutirao.location &&
    mutirao.location.coordinates &&
    mutirao.location.coordinates.length === 2;

  return (
    <Wrapper>
      <div className="min-h-screen">
        {/*<NavBar />*/}
        <div className="container">
          <div className="content-container">
            <div className="image-section">
              <img
                src={
                  mutirao.imagemCapa
                    ? `http://localhost:5100${mutirao.imagemCapa}`
                    : "http://localhost:5100/uploads/default.png"
                }
                alt={`Imagem do mutirão: ${mutirao.titulo}`}
                className="mutirao-image"
              />
              <div className="autor-info">
                <span>Organizado por:</span>
                <h3>{mutirao.criadoPor.nome}</h3>
              </div>

              <div className="info-section">
                <Wrapper>
                  <div className="button-group">
                    {podeEditar ? (
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/mutirao/${mutirao._id}/editar`)
                        }
                        disabled={isSubmitting}
                      >
                        Editar
                      </button>
                    ) : (
                      currentUser &&
                      (currentUser._id === mutirao.criadoPor._id ||
                        currentUser.isAdmin) && (
                        <div className="edicao-bloqueada">
                          <p>
                            Edição bloqueada: faltam menos de 48 horas para o
                            início do mutirão.
                          </p>
                        </div>
                      )
                    )}

                    {currentUser &&
                      (currentUser._id === mutirao.criadoPor._id ||
                        currentUser.isAdmin) && (
                        <button
                          className="delete-btn"
                          onClick={handleExcluirMutirao}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processando..." : "Excluir"}
                        </button>
                      )}
                  </div>
                </Wrapper>
              </div>
            </div>
            <div className="info-section">
              <h1>{mutirao.titulo}</h1>
              <p className="date-author">
                Por {mutirao.criadoPor.nome} • Acontece em {dataFormatada}{" "}
                {mutirao.horario && `às ${mutirao.horario}`} horas
              </p>

              <div className="section">
                <h2>Descrição</h2>
                <p>{mutirao.descricao}</p>
              </div>

              <div className="section">
                <h2>Local</h2>
                <div className="location-box">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{mutirao.local}</span>
                </div>

                {canDisplayMap ? (
                  <div className="map-container-visualizar">
                    <MapContainer
                      center={mapPosition}
                      zoom={15} // Zoom level
                      className="leaflet-map"
                      // Opções de interatividade com o mapa - comente ou descomente se necessário
                      dragging={false}
                      touchZoom={false}
                      doubleClickZoom={false}
                      scrollWheelZoom={false}
                      boxZoom={false}
                      keyboard={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={mapPosition}>
                        <Popup className="leaflet-popup">
                          {mutirao.local} <br /> {/* Show address in popup */}
                          {mutirao.numeroEComplemento && (
                            <>
                              {mutirao.numeroEComplemento}
                              <br />
                            </>
                          )}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${mutirao.local}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i
                              className="fas fa-map"
                              style={{ marginRight: "6px" }}
                            ></i>
                            Abrir no Google Maps
                          </a>
                          {/* <a
                            href={`https://www.google.com/maps/search/?api=1&query=${mapPosition[0]},${mapPosition[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Abrir no Google Maps
                          </a> */}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                ) : (
                  <p style={{ marginTop: "10px", color: "grey" }}>
                    Localização não disponível no mapa.
                  </p>
                )}
              </div>

              <div className="section">
                <h2>Tarefas</h2>
                <p className="section-description">
                  Atividades que serão desenvolvidas no evento
                </p>
                <div className="tasks-list">
                  {mutirao.tarefas.map((tarefa, index) => (
                    <div key={index} className="task-item">
                      <p>{tarefa}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section">
                <h2>Habilidades</h2>
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
              </div>

              <div className="section">
                <h2>Materiais e Ferramentas</h2>
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

              {podeParticipar && (
                <div className="section">
                  <h2>Termo de Aceitação</h2>
                  <p className="section-description">
                    Leia e confirme para participar deste mutirão
                  </p>
                  <label className="termo-container">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={aceitouTermo}
                        onChange={(e) => setAceitouTermo(e.target.checked)}
                      />
                    </div>
                    <div className="termo-text">
                      <p>
                        Eu concordo em participar deste mutirão de forma
                        voluntária, contribuindo com minhas habilidades e
                        seguindo as orientações dos organizadores. Entendo que o
                        objetivo é desenvolver melhorias para a biblioteca da
                        comunidade e, se necessário, trarei meus próprios
                        equipamentos para colaborar. Comprometo-me a agir com
                        respeito, responsabilidade e colaboração, garantindo um
                        ambiente seguro e inclusivo para todos os participantes.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              <div className="button-group">
                <button
                  type="button"
                  className="back-btn"
                  /*onClick={() => navigate(-1)}*/
                  onClick={() => navigate("/user")}
                >
                  Voltar
                </button>
                {podeParticipar && (
                  <button
                    className={`submit-btn ${
                      !aceitouTermo || isSubmitting ? "disabled" : ""
                    }`}
                    onClick={handleInscricao}
                    disabled={!aceitouTermo || isSubmitting}
                  >
                    {isSubmitting
                      ? "Processando..."
                      : isInscrito
                      ? "Cancelar Participação"
                      : "Quero Ser Voluntário"}{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default VisualizarMutirao;
