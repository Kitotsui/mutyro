import React, { useState } from "react";
import Wrapper from "../assets/wrappers/FAQ";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useIdioma } from "../context/IdiomaContext";
import { useTranslation } from "react-i18next";

const Configuracoes = () => {
  const { t } = useTranslation();
  const { idioma, setIdioma } = useIdioma();
  const [abaAtiva, setAbaAtiva] = useState("gerais");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('configuracoes.salvar'));
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
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { msg?: string } } };
      toast.error(
        apiError.response?.data?.msg || t('configuracoes.erroRedefinirSenha')
      );
    }
  };

  const handleIdiomaChange = (novoIdioma: string) => {
    setIdioma(novoIdioma);
  };

  return (
    <Wrapper>
      <div className="faq-container">
        <h1 className="faq-title">{t('configuracoes.titulo')}</h1>
        <div className="tabs">
          <button
            className={`tab-btn ${abaAtiva === "gerais" ? "active" : ""}`}
            onClick={() => setAbaAtiva("gerais")}
          >
            {t('configuracoes.abaGerais')}
          </button>
          <button
            className={`tab-btn ${abaAtiva === "seguranca" ? "active" : ""}`}
            onClick={() => setAbaAtiva("seguranca")}
          >
            {t('configuracoes.abaSeguranca')}
          </button>
        </div>
        {abaAtiva === "gerais" && (
          <form
            style={{ maxWidth: 500, margin: "0 auto" }}
            onSubmit={handleSalvar}
          >
            <div className="faq-item">
              <div className="faq-question">{t('configuracoes.idioma')}</div>
              <div className="faq-answer">
                <select
                  value={idioma}
                  onChange={(e) => handleIdiomaChange(e.target.value)}
                  style={{ padding: "0.5rem 1rem", borderRadius: 8 }}
                >
                  <option value="pt-BR">{t('idiomas.portugues')}</option>
                  <option value="en-US">{t('idiomas.ingles')}</option>
                  <option value="es-ES">{t('idiomas.espanhol')}</option>
                </select>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button type="submit" className="btn btn-primary">
                {t('configuracoes.botaoSalvar')}
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
              <label htmlFor="senhaAtual">{t('configuracoes.senhaAtual')}</label>
              <input
                type="password"
                id="senhaAtual"
                name="senhaAtual"
                placeholder={t('configuracoes.senhaAtual')}
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="novaSenha">{t('configuracoes.novaSenha')}</label>
              <input
                type="password"
                id="novaSenha"
                name="novaSenha"
                placeholder={t('configuracoes.novaSenha')}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmarNovaSenha">
                {t('configuracoes.confirmarNovaSenha')}
              </label>
              <input
                type="password"
                id="confirmarNovaSenha"
                name="confirmarNovaSenha"
                placeholder={t('configuracoes.confirmarNovaSenha')}
                value={confirmarNovaSenha}
                onChange={(e) => setConfirmarNovaSenha(e.target.value)}
              />
            </div>
            <button type="submit" className="btn submit-btn">
              {t('configuracoes.botaoSalvar')}
            </button>
          </form>
        )}
      </div>
    </Wrapper>
  );
};

export default Configuracoes;
