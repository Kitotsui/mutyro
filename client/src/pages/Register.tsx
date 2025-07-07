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

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // Primeiro faz o cadastro
      const response = await customFetch.post("/auth/cadastro", data);
      console.log("Resposta do cadastro:", response);

      if (response.data && response.data.msg) {
        toast.success(response.data.msg);
      } else {
        toast.success("Cadastro realizado com sucesso!");
      }

      // Depois faz o login automático
      try {
        const loginResponse = await customFetch.post("/auth/login", {
          email: data.email,
          senha: data.senha,
        });

        const from = location.state?.from || "/user"; // Redireciona para user ou para .from

        if (loginResponse.data && loginResponse.data.usuario) {
          setUsuario(loginResponse.data.usuario);
          toast.success("Login realizado com sucesso!");
          if (closeModal) closeModal();
          navigate(from, { replace: true });
        } else {
          toast.warn(
            "Cadastro realizado, mas houve um problema ao logar automaticamente. Por favor, faça o login."
          );
          if (closeModal) closeModal();
          if (switchToLogin) switchToLogin(); // Switch to login modal
        }
      } catch (loginError) {
        console.error("Erro no login automático:", loginError);
        toast.error(
          "Cadastro realizado, mas o login automático falhou. Por favor, tente fazer login manualmente."
        );
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
          "Erro desconhecido"
      );
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className="form">
        <h4>Cadastro</h4>
        <FormRow
          placeHolder="Nome"
          type="text"
          name="nome"
          //defaultValue="Usuario"
        />
        <FormRow
          placeHolder="Email"
          type="email"
          name="email"
          //defaultValue="usuario@gmail.com"
        />
        <FormRow
          placeHolder="CPF"
          type="text"
          name="cpf"
          //defaultValue="00000000000"
        />
        <FormRow
          placeHolder="Senha"
          type="password"
          name="senha"
          //defaultValue="88888888"
        />
        <FormRow
          placeHolder="Confirmar Senha"
          type="password"
          name="confirmar Senha"
          //defaultValue="88888888"
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
              </a> {" "}
              e a {" "}
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
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
        <div className="divider">
          <div className="line"></div>
          <span>ou</span>
          <div className="line"></div>
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span>Já é membro? </span>
          <button type="button" onClick={switchToLogin} className="switch-btn">
            Login
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Register;
