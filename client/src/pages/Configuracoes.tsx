import React, { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/FAQ";
import { useIdioma } from "../context/IdiomaContext";
import { toast } from "react-toastify";

const textos = {
  "pt-BR": {
    titulo: "Configurações",
    tema: "Tema do site",
    claro: "Claro",
    escuro: "Escuro",
    notificacoes: "Notificações",
    receberNotificacoes: "Receber notificações por e-mail",
    idioma: "Idioma",
    salvar: "Preferências salvas!",
    botaoSalvar: "Salvar configurações",
  },
  "en-US": {
    titulo: "Settings",
    tema: "Site theme",
    claro: "Light",
    escuro: "Dark",
    notificacoes: "Notifications",
    receberNotificacoes: "Receive notifications by email",
    idioma: "Language",
    salvar: "Preferences saved!",
    botaoSalvar: "Save settings",
  },
  "es-ES": {
    titulo: "Configuraciones",
    tema: "Tema del sitio",
    claro: "Claro",
    escuro: "Oscuro",
    notificacoes: "Notificaciones",
    receberNotificacoes: "Recibir notificaciones por correo electrónico",
    idioma: "Idioma",
    salvar: "¡Preferencias guardadas!",
    botaoSalvar: "Guardar configuraciones",
  },
};

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "claro";
  }
  return "claro";
};

const getInitialIdioma = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("idioma") || "pt-BR";
  }
  return "pt-BR";
};

const Configuracoes = () => {
  const { idioma, setIdioma } = useIdioma();
  const [tema, setTema] = useState(getInitialTheme());
  const [notificacoes, setNotificacoes] = useState(
    localStorage.getItem("notificacoes") === "true"
  );
  const [idiomaSelecionado, setIdiomaSelecionado] = useState(idioma);

  // Atualiza o idioma global ao clicar em salvar
  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("theme", tema);
    document.body.setAttribute("data-theme", tema);
    localStorage.setItem("notificacoes", notificacoes.toString());
    localStorage.setItem("idioma", idiomaSelecionado);
    setIdioma(idiomaSelecionado);
    toast.success(textos[idiomaSelecionado].salvar);
  };

  useEffect(() => {
    setIdiomaSelecionado(idioma);
  }, [idioma]);

  return (
    <Wrapper>
      <div className="faq-container">
        <h1 className="faq-title">{textos[idioma].titulo}</h1>
        <form style={{ maxWidth: 500, margin: "0 auto" }} onSubmit={handleSalvar}>
          <div className="faq-item">
            <div className="faq-question">{textos[idioma].tema}</div>
            <div className="faq-answer">
              <label style={{ marginRight: 16 }}>
                <input
                  type="radio"
                  name="tema"
                  value="claro"
                  checked={tema === "claro"}
                  onChange={() => setTema("claro")}
                />
                {textos[idioma].claro}
              </label>
              <label>
                <input
                  type="radio"
                  name="tema"
                  value="escuro"
                  checked={tema === "escuro"}
                  onChange={() => setTema("escuro")}
                />
                {textos[idioma].escuro}
              </label>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">{textos[idioma].notificacoes}</div>
            <div className="faq-answer">
              <label>
                <input
                  type="checkbox"
                  checked={notificacoes}
                  onChange={() => setNotificacoes((v) => !v)}
                />
                {textos[idioma].receberNotificacoes}
              </label>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">{textos[idioma].idioma}</div>
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
              {textos[idioma].botaoSalvar}
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Configuracoes; 