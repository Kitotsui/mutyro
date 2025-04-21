import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

type ApiError = {
  response?: {
    data?: {
      msg?: string;
    };
  };
  message?: string;
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login feito com sucesso!");
    return redirect("/user");
  } catch (error) {
    const apiError = error as ApiError; // Type assertion
    toast.error(
      apiError?.response?.data?.msg || apiError?.message || "Erro desconhecido"
    );
    return error;
  }
};

type Props = {
  switchToRegister?: () => void;
};

const Login = ({ switchToRegister }: Props) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method='post' action='/login' className='form'>
        <h4>Login</h4>
        <FormRow
          placeHolder="Usuário ou Email"
          type="email"
          name="email"
          defaultValue="rogerio@gmail.com"
        />
        <FormRow
          placeHolder="Senha"
          type="password"
          name="senha"
          defaultValue="88888888"
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Fazendo login..." : "Login"}
        </button>
        <Link to="/forgot-password" type="button" className="link-esqueci">
          Esqueci minha senha
        </Link>
        <span>Ainda não tem conta?</span>
        <button
          type="button"
          className="btn btn-link"
          onClick={switchToRegister}
        >
          Cadastre-se
        </button>
      </Form>
    </Wrapper>
  );
};
export default Login;
