import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/Notificacoes.js";
import {
  FaStar,
  FaUsers,
  FaBullhorn,
  FaShieldAlt,
  FaInbox,
  FaEnvelopeOpenText,
  FaTrash,
} from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  getNotificacoes,
  marcarTodasComoLidas,
  excluirNotificacao,
} from "../services/notificacaoService";
import { toast } from "react-toastify";

type Notificacao = {
  _id: string;
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
  tipo: string;
  mutiraoId?: string;
};

const categorias = [
  { key: "todas", label: "Todas", icon: <FaInbox /> },
  { key: "nao-lidas", label: "Não lidas", icon: <FaEnvelopeOpenText /> },
  { key: "importantes", label: "Importantes", icon: <FaStar /> },
  { key: "equipe", label: "Equipe", icon: <FaUsers /> },
  { key: "anuncios", label: "Anúncios", icon: <FaBullhorn /> },
  { key: "seguranca", label: "Segurança", icon: <FaShieldAlt /> },
];

const Notificacoes = () => {
  const [categoria, setCategoria] = useState("todas");
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchNotificacoes = async () => {
      setLoading(true);
      setErro("");
      try {
        const data = await getNotificacoes();
        setNotificacoes(data.notificacoes || []);
      } catch {
        setErro("Erro ao buscar notificações");
      } finally {
        setLoading(false);
      }
    };
    fetchNotificacoes();
  }, []);

  const filtrarNotificacoes = () => {
    if (categoria === "todas") return notificacoes;
    if (categoria === "nao-lidas") return notificacoes.filter((n) => !n.lida);
    // Outras categorias podem ser implementadas conforme necessário
    return notificacoes;
  };

  const handleMarcarComoLida = (id: string) => {
    setNotificacoes((prev) =>
      prev.map((notif) => (notif._id === id ? { ...notif, lida: true } : notif))
    );
  };

  const handleMarcarTodasComoLidas = async () => {
    try {
      await marcarTodasComoLidas();
      setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
    } catch {
      setErro("Erro ao marcar todas como lidas");
    }
  };

  const handleExcluirNotificacao = async (id: string) => {
    try {
      await excluirNotificacao(id);
      setNotificacoes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Notificação excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir notificação");
    }
  };

  return (
    <Wrapper>
      <div className="notificacoes-main-container">
        {/* Sidebar */}
        <aside className="notificacoes-sidebar">
          <nav>
            {categorias.map((cat) => (
              <button
                key={cat.key}
                className={`notificacoes-sidebar-btn ${
                  categoria === cat.key ? "ativo" : ""
                }`}
                onClick={() => setCategoria(cat.key)}
              >
                <span className="notificacoes-sidebar-icon">{cat.icon}</span>
                <span className="notificacoes-sidebar-label">{cat.label}</span>
                <span className="notificacoes-sidebar-count">
                  {cat.key === "todas"
                    ? notificacoes.length
                    : cat.key === "nao-lidas"
                    ? notificacoes.filter((n) => !n.lida).length
                    : 0}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Conteúdo principal */}
        <main className="notificacoes-content">
          {/* Header */}
          <div className="notificacoes-header">
            <div>
              <h1 className="notificacoes-title">Notificações</h1>
              <p className="notificacoes-subtitle">
                Suas mensagens e atualizações
              </p>
            </div>
            <div className="notificacoes-header-actions">
              <button
                className="notificacoes-btn-link"
                onClick={handleMarcarTodasComoLidas}
              >
                Marcar todas como lidas
              </button>
              <button className="notificacoes-btn-orange">
                <span style={{ marginRight: 8 }}>⚙️</span> Configurações
              </button>
            </div>
          </div>

          {/* Lista de notificações */}
          <div className="notificacoes-lista-cards">
            {loading && <div className="notificacoes-vazio">Carregando...</div>}
            {erro && <div className="notificacoes-vazio">{erro}</div>}
            {!loading && !erro && filtrarNotificacoes().length === 0 && (
              <div className="notificacoes-vazio">
                Nenhuma notificação encontrada.
              </div>
            )}
            {!loading &&
              !erro &&
              filtrarNotificacoes().map((notif) => (
                <div
                  key={notif._id}
                  className={`notificacoes-card ${
                    !notif.lida ? "nao-lida" : ""
                  }`}
                  onClick={() => !notif.lida && handleMarcarComoLida(notif._id)}
                  style={{ cursor: !notif.lida ? "pointer" : "default" }}
                >
                  <div className="notificacoes-card-icone">
                    {/* Ícone por tipo */}
                    <span className="notificacoes-card-icone-inner">🔔</span>
                  </div>
                  <div className="notificacoes-card-content">
                    <div className="notificacoes-card-header">
                      <h3 className="notificacoes-card-title">
                        {notif.titulo}
                      </h3>
                      <div className="notificacoes-card-meta">
                        <span className="notificacoes-card-data">
                          {notif.data
                            ? format(
                                new Date(notif.data),
                                "dd 'de' MMMM 'às' HH:mm",
                                { locale: ptBR }
                              )
                            : ""}
                        </span>
                        {!notif.lida && (
                          <div className="notificacoes-card-dot" />
                        )}
                      </div>
                    </div>
                    <p className="notificacoes-card-msg">{notif.mensagem}</p>
                    <div className="notificacoes-card-actions">
                      {/* Exemplo: botão de ação */}
                      {notif.tipo === "sucesso" && (
                        <button className="notificacoes-btn-orange">
                          Baixar Certificado
                        </button>
                      )}
                      <button
                        className="notificacoes-btn-fav"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Lógica para favoritar
                        }}
                      >
                        <FaStar />
                      </button>
                      <button
                        className="notificacoes-btn-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExcluirNotificacao(notif._id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </Wrapper>
  );
};

export default Notificacoes;
