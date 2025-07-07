import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/SolicitarRedefinicao";

const RedefinirSenha = () => {
  const { token } = useParams();
  const [novaSenha, setNovaSenha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    } catch (error) {
      toast.error("Erro ao redefinir senha.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="terms-container">
        <div className="contact-section">
          <h2>Redefinir Senha</h2>
          <p>Insira sua nova senha abaixo para redefini-la.</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              {/* <label htmlFor="novaSenha">Nova Senha</label> */}
              <input
                type="password"
                id="novaSenha"
                name="novaSenha"
                placeholder="Digite sua nova senha"
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
              {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default RedefinirSenha;