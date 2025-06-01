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
          defaultValue="Usuario"
        />
        <FormRow
          placeHolder="Email"
          type="email"
          name="email"
          defaultValue="usuario@gmail.com"
        />
        <FormRow
          placeHolder="CPF"
          type="text"
          name="cpf"
          defaultValue="00000000000"
        />
        <FormRow
          placeHolder="Senha"
          type="password"
          name="senha"
          defaultValue="88888888"
        />
        <FormRow
          placeHolder="Confirmar Senha"
          type="password"
          name="confirmarSenha"
          defaultValue="88888888"
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
        <div className="divider">
          <div className="line"></div>
          <span>ou</span>
          <div className="line"></div>
        </div>
        <button type="button" className="btn-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            ></path>
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            ></path>
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            ></path>
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            ></path>
          </svg>
          Continuar com Google
        </button>
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
