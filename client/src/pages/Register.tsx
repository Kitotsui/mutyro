import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, useNavigation } from "react-router-dom";
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

// Função de validação de CPF
function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  if (digito1 !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  return digito2 === parseInt(cpf.charAt(10));
}

const Register = ({ switchToLogin }: Props) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { setUsuario } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Validação de CPF no front
    const cpf = data.cpf as string;
    if (!validarCPF(cpf)) {
      toast.error("CPF inválido. Verifique e tente novamente.");
      return;
    }

    try {
      const response = await customFetch.post("/auth/cadastro", data);
      if (response.data?.msg) toast.success(response.data.msg);
      else toast.success("Cadastro realizado com sucesso!");

      try {
        const loginResponse = await customFetch.post("/auth/login", {
          email: data.email,
          senha: data.senha
        });

        if (loginResponse.data?.usuario) {
          setUsuario(loginResponse.data.usuario);
          toast.success("Login realizado com sucesso!");
          window.location.href = "/user";
        }
      } catch (loginError) {
        console.error("Erro no login automático:", loginError);
        if (switchToLogin) switchToLogin();
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      const apiError = error as ApiError;
      toast.error(apiError?.response?.data?.msg || apiError?.message || "Erro desconhecido");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className='form'>
        <h4>Cadastro</h4>
        <FormRow placeHolder="Nome" type="text" name="nome" defaultValue="Usuario" />
        <FormRow placeHolder="Email" type="email" name="email" defaultValue="usuario@gmail.com" />
        <FormRow placeHolder="CPF" type="text" name="cpf" defaultValue="00000000000" />
        <FormRow placeHolder="Senha" type="password" name="senha" defaultValue="88888888" />
        <FormRow placeHolder="Confirmar Senha" type="password" name="confirmarSenha" defaultValue="88888888" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
        <div className="divider">
          <div className="line"></div>
          <span>ou</span>
          <div className="line"></div>
        </div>
        <button type="button" className="btn-link">
          {/* SVG do Google */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..." />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77..." />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09..." />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15..." />
          </svg>
          Continuar com Google
        </button>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
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
