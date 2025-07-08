import { useState } from "react";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {
  Form,
  useNavigation,
  useNavigate,
  useLocation,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

type ApiError = {
  response?: {
    data?: {
      msg?: string;
    };
  };
  message?: string;
};

type Props = {
  switchToLogin?: (e?: React.MouseEvent) => void;
  closeModal?: () => void;
};

const Register = ({ switchToLogin, closeModal }: Props) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { setUsuario } = useAuth();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    // cpf: "", // Temporariamente removido
    senha: "",
    confirmarSenha: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Primeiro faz o cadastro
      const response = await customFetch.post("/auth/cadastro", formData);
      console.log("Resposta do cadastro:", response);

      if (response.data && response.data.msg) {
        toast.success(response.data.msg);
      } else {
        toast.success(t('geral.cadastroSucesso'));
      }

      // Depois faz o login automático
      try {
        const loginResponse = await customFetch.post("/auth/login", {
          email: formData.email,
          senha: formData.senha,
        });

        const from = location.state?.from || "/user"; // Redireciona para user ou para .from

        if (loginResponse.data && loginResponse.data.usuario) {
          setUsuario(loginResponse.data.usuario);
          toast.success(t('geral.loginSucesso'));
          if (closeModal) closeModal();
          navigate(from, { replace: true });
        } else {
          toast.warn(t('geral.loginAutomaticoErro'));
          if (closeModal) closeModal();
          if (switchToLogin) switchToLogin(); // Switch to login modal
        }
      } catch (loginError) {
        console.error("Erro no login automático:", loginError);
        toast.error(t('geral.loginAutomaticoFalhou'));
        // Se falhar o login, apenas fecha o modal de cadastro
        if (closeModal) closeModal();
        if (switchToLogin) switchToLogin();
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      const apiError = error as ApiError;
      toast.error(
        apiError?.response?.data?.msg ||
          apiError?.message ||
          t('geral.erro')
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className="form">
        <h4>{t('navbar.cadastro')}</h4>
        <FormRow
          type="text"
          name="nome"
          value={formData.nome}
          handleChange={handleInputChange}
        />
        <FormRow
          type="email"
          name="email"
          value={formData.email}
          handleChange={handleInputChange}
        />
        {/* Temporariamente removendo CPF para teste
        <FormRow
          type="text"
          name="cpf"
          //defaultValue="00000000000"
        />
        */}
        <FormRow
          type="password"
          name="senha"
          value={formData.senha}
          handleChange={handleInputChange}
        />
        <FormRow
          type="password"
          name="confirmarSenha"
          value={formData.confirmarSenha}
          handleChange={handleInputChange}
        />
        <div className="termos">
          <label className="side-checkbox">
            <input type="checkbox" required />
            <span>
              Eu li e concordo com os{" "}
              <a
                href="/termosdeuso"
                target="_blank"
                rel="noopener noreferrer"
                className="link-esqueci"
              >
                Termos de Uso
              </a>{" "}
              e a{" "}
              <a
                href="/politicaprivacidade"
                target="_blank"
                rel="noopener noreferrer"
                className="link-esqueci"
              >
                Política de Privacidade
              </a>
              .
            </span>
          </label>
        </div>
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? t('navbar.cadastrando') : t('navbar.cadastrar')}
        </button>
        <div className="divider">
          <div className="line"></div>
          <span>{t('geral.ou')}</span>
          <div className="line"></div>
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span>Já é membro? </span>
          <button
            type="button"
            onClick={switchToLogin}
            className="btn switch-btn"
          >
            Login
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Register;
