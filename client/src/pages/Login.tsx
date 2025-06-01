import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, useNavigate, useLocation } from "react-router-dom";
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
  switchToRegister?: () => void;
  closeModal?: () => void;
};

const Login = ({ switchToRegister, closeModal }: Props) => {
  const { setUsuario } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      console.log("Enviando dados para login:", data);
      const response = await customFetch.post("/auth/login", data);
      console.log("Resposta completa do login:", response);

      // Direcionamento de navegação após o login padrão /user ou do .from
      const from = location.state?.from || "/user";

      if (response.data && response.data.usuario) {
        console.log("Dados do usuário recebidos:", response.data.usuario);
        setUsuario(response.data.usuario);
        toast.success("Login feito com sucesso!");
        if (closeModal) closeModal();
        navigate(from, { replace: true });
      } else {
        console.log("Tentando buscar usuário atual...");
        const userResponse = await customFetch.get("/usuarios/atual-usuario");
        console.log("Resposta do usuário atual:", userResponse);

        if (userResponse.data && userResponse.data.usuario) {
          console.log(
            "Dados do usuário atual recebidos:",
            userResponse.data.usuario
          );
          setUsuario(userResponse.data.usuario);
          toast.success("Login feito com sucesso!");
          if (closeModal) closeModal();
          navigate(from, { replace: true });
        } else {
          throw new Error("Não foi possível obter os dados do usuário");
        }
      }
    } catch (error) {
      console.error("Erro detalhado no login:", error);
      const apiError = error as ApiError;
      toast.error(
        apiError?.response?.data?.msg ||
          apiError?.message ||
          "Erro desconhecido ao tentar fazer login"
      );
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className="form">
        <h4>Login</h4>
        <FormRow
          placeHolder="Usuário ou Email"
          type="email"
          name="email"
          defaultValue="grosbilda@gmail.com"
        />
        <FormRow
          placeHolder="Senha"
          type="password"
          name="senha"
          defaultValue="secret123"
        />
        <button type="submit" className="btn btn-block">
          Login
        </button>
        <a href="#" className="link-esqueci">
          Esqueceu sua senha?
        </a>
        <div className="divider">
          <div className="line"></div>
          <span>ou</span>
          <div className="line"></div>
        </div>
        <button type="button" className="btn-link" onClick={switchToRegister}>
          Criar uma conta
        </button>
      </Form>
    </Wrapper>
  );
};

export default Login;
