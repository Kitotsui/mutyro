import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form } from "react-router-dom";
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
};

const Login = ({ switchToRegister }: Props) => {
  const { setUsuario } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      console.log('Enviando dados para login:', data);
      const response = await customFetch.post("/auth/login", data);
      console.log('Resposta completa do login:', response);
      
      if (response.data && response.data.usuario) {
        console.log('Dados do usuário recebidos:', response.data.usuario);
        setUsuario(response.data.usuario);
        toast.success("Login feito com sucesso!");
        window.location.href = "/user";
      } else {
        console.log('Tentando buscar usuário atual...');
        const userResponse = await customFetch.get("/usuarios/atual-usuario");
        console.log('Resposta do usuário atual:', userResponse);
        
        if (userResponse.data && userResponse.data.usuario) {
          console.log('Dados do usuário atual recebidos:', userResponse.data.usuario);
          setUsuario(userResponse.data.usuario);
          toast.success("Login feito com sucesso!");
          window.location.href = "/user";
        } else {
          throw new Error("Não foi possível obter os dados do usuário");
        }
      }
    } catch (error) {
      console.error('Erro detalhado no login:', error);
      const apiError = error as ApiError;
      toast.error(
        apiError?.response?.data?.msg || apiError?.message || "Erro desconhecido"
      );
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className='form'>
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
        <button
          type="button"
          className="btn-link"
          onClick={switchToRegister}
        >
          Criar uma conta
        </button>
      </Form>
    </Wrapper>
  );
};

export default Login;
