import { useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/SolicitarRedefinicao";
import { useNavigate } from "react-router-dom";

const SolicitarRedefinicao = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await customFetch.post("/auth/redefinir-senha", {
        email,
      });
      toast.success(response.data.msg);
      navigate("/");
    } catch (error) {
      toast.error("Erro ao solicitar redefinição de senha.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="terms-container">
        <div className="contact-section">
          <h2>Redefinir Senha</h2>
          <p>
            Insira seu e-mail abaixo para receber um link de redefinição de
            senha.
          </p>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              {/* <label htmlFor="email">Seu Email</label> */}
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Link"}
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default SolicitarRedefinicao;
