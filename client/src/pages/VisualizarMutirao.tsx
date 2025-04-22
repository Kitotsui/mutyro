import { useState, useEffect } from "react";
import { LoaderFunctionArgs, useNavigate, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/VisualizarMutirao";
import { NavBar } from "../components";
import customFetch from "@/utils/customFetch";
import { useLoaderData } from "react-router-dom";

interface Mutirao {
  _id: string;
  titulo: string;
  data: string;
  descricao: string;
  local: string;
  materiais?: string[];
  tarefas: string[];
  mutiraoStatus: string;
  mutiraoTipo: string;
  inscritos?: string[];
  criadoPor: CriadoPorInfo;
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

  // Checagem básica de parâmetro ainda útil
  if (!id) {
    throw new Response("Requisição inválida: ID do mutirão ausente na URL.", {
      status: 400,
    });
  }

  try {
    console.log(`Loader: Buscando mutirão ID: ${id}`);
    const response = await customFetch(`/mutiroes/${id}`);
    const mutirao = response.data.mutirao;
    if (!mutirao) {
      throw new Response("Mutirão não encontrado.", { status: 404 });
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
  // const { id } = useParams();
  const [isInscrito, setIsInscrito] = useState(false);
  const [aceitouTermo, setAceitouTermo] = useState(false);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([
    { nome: "NÃO IMPLEMENTADO", checked: false },
  ]);

  const [materiaisSelecionados, setMateriaisSelecionados] = useState<{
    [key: string]: boolean;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  // const [materiais, setMateriais] = useState<Material[]>([
  //   { nome: "Ferramentas de Pintura", checked: false },
  //   { nome: "Martelos e pregos", checked: false },
  //   { nome: "Parafusadeira", checked: false },
  // ]);

  // Encontra o mutirão com base no ID da URL
  // const mutirao = mockMutiroes.find((m) => m.id === Number(id));

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
      alert("Por favor, aceite o termo de participação antes de se inscrever.");
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

  return (
    <Wrapper>
      <div className="min-h-screen">
        {/*<NavBar />*/}
        <div className="container">
          <div className="content-container">
            <div className="image-section">
              {/* <div className="image-container">
                <img
                  src={mutirao.image}
                  alt={`Imagem do mutirão: ${mutirao.title}`}
                  className="mutirao-image"
                />
                <p className="image-credit">Imagem por {mutirao.author}</p>
              </div> */}
              <div className="autor-info">
                <span>Organizado por:</span>
                <h3>{mutirao.criadoPor.nome}</h3>
              </div>
            </div>

            <div className="info-section">
              <h1>{mutirao.titulo}</h1>
              <p className="date-author">
                Por {mutirao.criadoPor.nome} • {mutirao.data}
              </p>

              <div className="section">
                <h2>Descrição</h2>
                <p>{mutirao.descricao}</p>
              </div>

              <div className="section">
                <h2>Local</h2>
                <div className="location-box">
                  <svg
                    className="location-icon"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{mutirao.local}</span>
                </div>
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
                      voluntária, contribuindo com minhas habilidades e seguindo
                      as orientações dos organizadores. Entendo que o objetivo é
                      desenvolver melhorias para a biblioteca da comunidade e,
                      se necessário, trarei meus próprios equipamentos para
                      colaborar. Comprometo-me a agir com respeito,
                      responsabilidade e colaboração, garantindo um ambiente
                      seguro e inclusivo para todos os participantes.
                    </p>
                  </div>
                </label>
              </div>

              <div className="button-group">
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => navigate(-1)}
                >
                  Voltar
                </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default VisualizarMutirao;
