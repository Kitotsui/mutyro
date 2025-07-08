import React, { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/FAQ";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "claro";
  }
  return "claro";
};

const Configuracoes = () => {
  const { t, i18n } = useTranslation();
  const [tema, setTema] = useState(getInitialTheme());
  const [notificacoes, setNotificacoes] = useState(
    localStorage.getItem("notificacoes") === "true"
  );
  const [idiomaSelecionado, setIdiomaSelecionado] = useState(i18n.language);

  // Atualiza o idioma global ao clicar em salvar
  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("theme", tema);
    document.body.setAttribute("data-theme", tema);
    localStorage.setItem("notificacoes", notificacoes.toString());
    localStorage.setItem("idioma", idiomaSelecionado);
    i18n.changeLanguage(idiomaSelecionado);
    toast.success(t('configuracoes.salvar'));
  };

  useEffect(() => {
    setIdiomaSelecionado(i18n.language);
  }, [i18n.language]);

  return (
    <Wrapper>
      <div className="faq-container">
        <h1 className="faq-title">{t('configuracoes.titulo')}</h1>
        <form style={{ maxWidth: 500, margin: "0 auto" }} onSubmit={handleSalvar}>
          <div className="faq-item">
            <div className="faq-question">{t('configuracoes.tema')}</div>
            <div className="faq-answer">
              <label style={{ marginRight: 16 }}>
                <input
                  type="radio"
                  name="tema"
                  value="claro"
                  checked={tema === "claro"}
                  onChange={() => setTema("claro")}
                />
                {t('configuracoes.claro')}
              </label>
              <label>
                <input
                  type="radio"
                  name="tema"
                  value="escuro"
                  checked={tema === "escuro"}
                  onChange={() => setTema("escuro")}
                />
                {t('configuracoes.escuro')}
              </label>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">{t('configuracoes.notificacoes')}</div>
            <div className="faq-answer">
              <label>
                <input
                  type="checkbox"
                  checked={notificacoes}
                  onChange={() => setNotificacoes((v) => !v)}
                />
                {t('configuracoes.receberNotificacoes')}
              </label>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">{t('configuracoes.idioma')}</div>
            <div className="faq-answer">
              <select
                value={idiomaSelecionado}
                onChange={(e) => setIdiomaSelecionado(e.target.value)}
                style={{ padding: "0.5rem 1rem", borderRadius: 8 }}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">Inglês (English)</option>
                <option value="es-ES">Espanhol (Español)</option>
              </select>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button type="submit" className="btn btn-primary">
              {t('configuracoes.botaoSalvar')}
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Configuracoes; 