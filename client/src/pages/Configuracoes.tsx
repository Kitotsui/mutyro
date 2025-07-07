import React, { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/FAQ";
import { useIdioma } from "../context/IdiomaContext";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const textos = {
  "pt-BR": {
    titulo: "Configurações",
    abaGerais: "Geral",
    abaSeguranca: "Segurança",
    tema: "Tema do site",
    claro: "Claro",
    escuro: "Escuro",
    notificacoes: "Notificações",
    receberNotificacoes: "Receber notificações por e-mail",
    idioma: "Idioma",
    salvar: "Preferências salvas!",
    botaoSalvar: "Salvar configurações",
    alterarSenha: "Alterar senha",
    senhaAtual: "Senha atual",
    novaSenha: "Nova senha",
    confirmarNovaSenha: "Confirmar nova senha",
  },
  "en-US": {
    titulo: "Settings",
    abaGerais: "General Settings",
    abaSeguranca: "Security",
    tema: "Site theme",
    claro: "Light",
    escuro: "Dark",
    notificacoes: "Notifications",
    receberNotificacoes: "Receive notifications by email",
    idioma: "Language",
    salvar: "Preferences saved!",
    botaoSalvar: "Save settings",
    alterarSenha: "Change password",
    senhaAtual: "Current password",
    novaSenha: "New password",
    confirmarNovaSenha: "Confirm new password",
  },
  "es-ES": {
    titulo: "Configuraciones",
    abaGerais: "Generales",
    abaSeguranca: "Seguridad",
    tema: "Tema del sitio",
    claro: "Claro",
    escuro: "Oscuro",
    notificacoes: "Notificaciones",
    receberNotificacoes: "Recibir notificaciones por correo electrónico",
    idioma: "Idioma",
    salvar: "¡Preferencias guardadas!",
    botaoSalvar: "Guardar configuraciones",
    alterarSenha: "Cambiar contraseña",
    senhaAtual: "Contraseña actual",
    novaSenha: "Nueva contraseña",
    confirmarNovaSenha: "Confirmar nueva contraseña",
  },
};

const Configuracoes = () => {
  const { idioma, setIdioma } = useIdioma();
  const [tema, setTema] = useState(localStorage.getItem("theme") || "claro");
  const [notificacoes, setNotificacoes] = useState(
    localStorage.getItem("notificacoes") === "true"
  );
  const [idiomaSelecionado, setIdiomaSelecionado] = useState(idioma);
  const [abaAtiva, setAbaAtiva] = useState("gerais");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("theme", tema);
    document.body.setAttribute("data-theme", tema);
    localStorage.setItem("notificacoes", notificacoes.toString());
    localStorage.setItem("idioma", idiomaSelecionado);
    setIdioma(idiomaSelecionado);
    toast.success(textos[idiomaSelecionado].salvar);
  };

  const handleRedefinirSenha = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await customFetch.post("/auth/recuperar-senha", {
        senhaAtual,
        novaSenha,
      });
      toast.success(response.data.msg);

      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarNovaSenha("");
    } catch (error: any) {
      toast.error(
        error.response?.data?.msg || "Erro ao redefinir senha. Tente novamente."
      );
    }
  };

  useEffect(() => {
    setIdiomaSelecionado(idioma);
  }, [idioma]);

  return (
    <Wrapper>
      <div className="faq-container">
        <h1 className="faq-title">{textos[idioma].titulo}</h1>
        <div className="tabs">
          <button
            className={`tab-btn ${abaAtiva === "gerais" ? "active" : ""}`}
            onClick={() => setAbaAtiva("gerais")}
          >
            {textos[idioma].abaGerais}
          </button>
          <button
            className={`tab-btn ${abaAtiva === "seguranca" ? "active" : ""}`}
            onClick={() => setAbaAtiva("seguranca")}
          >
            {textos[idioma].abaSeguranca}
          </button>
        </div>
        {abaAtiva === "gerais" && (
          <form
            style={{ maxWidth: 500, margin: "0 auto" }}
            onSubmit={handleSalvar}
          >
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
        )}
        {abaAtiva === "seguranca" && (
          <form
            className="contact-form"
            style={{ maxWidth: 500, margin: "0 auto" }}
            onSubmit={handleRedefinirSenha}
          >
            <div className="form-group">
              <label htmlFor="senhaAtual">{textos[idioma].senhaAtual}</label>
              <input
                type="password"
                id="senhaAtual"
                name="senhaAtual"
                placeholder={textos[idioma].senhaAtual}
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="novaSenha">{textos[idioma].novaSenha}</label>
              <input
                type="password"
                id="novaSenha"
                name="novaSenha"
                placeholder={textos[idioma].novaSenha}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmarNovaSenha">
                {textos[idioma].confirmarNovaSenha}
              </label>
              <input
                type="password"
                id="confirmarNovaSenha"
                name="confirmarNovaSenha"
                placeholder={textos[idioma].confirmarNovaSenha}
                value={confirmarNovaSenha}
                onChange={(e) => setConfirmarNovaSenha(e.target.value)}
              />
            </div>
            <button type="submit" className="btn submit-btn">
              {textos[idioma].botaoSalvar}
            </button>
          </form>
        )}
      </div>
    </Wrapper>
  );
};

export default Configuracoes;
