import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/Notificacoes.js";
import {
  FaStar,
  FaTrash,
} from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  getNotificacoes,
  marcarTodasComoLidas,
  excluirNotificacao,
  toggleFavorita,
} from "../services/notificacaoService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type Notificacao = {
  _id: string;
  titulo?: string;
  mensagem?: string;
  data: string;
  lida: boolean;
  favorita: boolean;
  tipo: string;
  mutiraoId?: string;
  variaveis?: Record<string, unknown>;
};

const Notificacoes = () => {
  const { t } = useTranslation();
  const [categoria, setCategoria] = useState("todas");
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const categorias = [
    { key: "todas", label: t('notificacoes.categorias.todas'), icon: "📬" },
    { key: "nao-lidas", label: t('notificacoes.categorias.naoLidas'), icon: "📨" },
    { key: "importantes", label: t('notificacoes.categorias.importantes'), icon: "⭐" },
  ];

  useEffect(() => {
    const fetchNotificacoes = async () => {
      setLoading(true);
      setErro("");
      try {
        const data = await getNotificacoes();
        setNotificacoes(data.notificacoes || []);
      } catch {
        setErro(t('notificacoes.erro'));
      } finally {
        setLoading(false);
      }
    };
    fetchNotificacoes();
  }, [t]);

  const traduzirNotificacao = (notif: Notificacao) => {
    const tipoKey = notif.tipo || 'padrao';
    const tituloKey = `notificacoes.tipos.${tipoKey}.titulo`;
    const mensagemKey = `notificacoes.tipos.${tipoKey}.mensagem`;
    
    const variaveis: Record<string, unknown> = { ...notif, ...(notif.variaveis || {}) };
    
    return {
      titulo: t(tituloKey, { ...variaveis, defaultValue: tipoKey }),
      mensagem: t(mensagemKey, { ...variaveis, defaultValue: tipoKey })
    };
  };

  const filtrarNotificacoes = () => {
    if (categoria === "todas") return notificacoes;
    if (categoria === "nao-lidas") return notificacoes.filter((n) => !n.lida);
    if (categoria === "importantes") return notificacoes.filter((n) => n.favorita);
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
      toast.success(t('notificacoes.todasMarcadasComoLidas'));
    } catch {
      setErro(t('notificacoes.erroMarcarTodas'));
    }
  };

  const handleExcluirNotificacao = async (id: string) => {
    try {
      await excluirNotificacao(id);
      setNotificacoes((prev) => prev.filter((n) => n._id !== id));
      toast.success(t('notificacoes.excluidaSucesso'));
    } catch {
      toast.error(t('notificacoes.erroExcluir'));
    }
  };

  const handleToggleFavorita = async (id: string) => {
    try {
      const response = await toggleFavorita(id);
      setNotificacoes((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, favorita: response.notificacao.favorita } : notif
        )
      );
      toast.success(response.msg);
    } catch {
      toast.error(t('notificacoes.erroFavoritar'));
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
                    : cat.key === "importantes"
                    ? notificacoes.filter((n) => n.favorita).length
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
              <h1 className="notificacoes-title">{t('notificacoes.titulo')}</h1>
              <p className="notificacoes-subtitle">
                {t('notificacoes.subtitulo')}
              </p>
            </div>
            <div className="notificacoes-header-actions">
              <button
                className="notificacoes-btn-link"
                onClick={handleMarcarTodasComoLidas}
              >
                {t('notificacoes.marcarTodasComoLidas')}
              </button>
            </div>
          </div>

          {/* Lista de notificações */}
          <div className="notificacoes-lista-cards">
            {loading && <div className="notificacoes-vazio">{t('notificacoes.carregando')}</div>}
            {erro && <div className="notificacoes-vazio">{erro}</div>}
            {!loading && !erro && filtrarNotificacoes().length === 0 && (
              <div className="notificacoes-vazio">
                {t('notificacoes.nenhuma')}
              </div>
            )}
            {!loading &&
              !erro &&
              filtrarNotificacoes().map((notif) => {
                const notificacaoTraduzida = traduzirNotificacao(notif);
                return (
                  <div
                    key={notif._id}
                    className={`notificacoes-card ${!notif.lida ? "nao-lida" : ""} ${notif.favorita ? "favorita" : ""}`}
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
                          {notificacaoTraduzida.titulo}
                        </h3>
                        <div className="notificacoes-card-meta">
                          <span className="notificacoes-card-data">
                            {notif.data
                              ? format(
                                  new Date(notif.data),
                                  t('notificacoes.dataFormato'),
                                  { locale: ptBR }
                                )
                              : ""}
                          </span>
                          {!notif.lida && (
                            <div className="notificacoes-card-dot" />
                          )}
                        </div>
                      </div>
                      <p className="notificacoes-card-msg">{notificacaoTraduzida.mensagem}</p>
                      <div className="notificacoes-card-actions">
                        {/* Exemplo: botão de ação */}
                        {notif.tipo === "sucesso" && (
                          <button className="notificacoes-btn-orange">
                            {t('notificacoes.baixarCertificado')}
                          </button>
                        )}
                        <button
                          className={`notificacoes-btn-fav ${notif.favorita ? 'favoritada' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorita(notif._id);
                          }}
                          title={notif.favorita ? t('notificacoes.desfavoritar') : t('notificacoes.favoritar')}
                        >
                          <FaStar />
                        </button>
                        <button
                          className="notificacoes-btn-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExcluirNotificacao(notif._id);
                          }}
                          title={t('notificacoes.excluir')}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      </div>
    </Wrapper>
  );
};

export default Notificacoes;
