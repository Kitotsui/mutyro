import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/SolicitarRedefinicao";

const RedefinirSenha = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const [novaSenha, setNovaSenha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await customFetch.post(
        "/auth/redefinir-senha/confirmar",
        {
          token,
          novaSenha,
        }
      );
      toast.success(response.data.msg);
      navigate("/");
    } catch {
      toast.error(t('configuracoes.erroRedefinirSenha'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="terms-container">
        <div className="contact-section">
          <h2>{t('configuracoes.alterarSenha')}</h2>
          <p>{t('configuracoes.inserirNovaSenha')}</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              {/* <label htmlFor="novaSenha">Nova Senha</label> */}
              <input
                type="password"
                id="novaSenha"
                name="novaSenha"
                placeholder={t('configuracoes.novaSenhaPlaceholder')}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('configuracoes.redefinindo') : t('configuracoes.alterarSenha')}
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default RedefinirSenha;
