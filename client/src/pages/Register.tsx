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
/*
export const action = async ( {request} ) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); //obtem os dados do formulario
  
  try {
    await customFetch.post('/auth/cadastro', data) //manda o dado e faz uma solicitacao
    toast.success('Cadastro realizado com sucesso!');
    return redirect('/login') //redireciona para a pagina de login
  } catch (error) {
    toast.error(error?.response.data?.msg); //VERIFICAR DEPOIS O QUE ESTÁ DE ERRADO aula120
    return error;
    
  }
}*/
export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/cadastro", data);
    toast.success("Cadastro realizado com sucesso!");
    return redirect("/login");
  } catch (error: unknown) {
    // Tipagem explícita
    const apiError = error as ApiError; // Type assertion
    toast.error(
      apiError?.response?.data?.msg || apiError?.message || "Erro desconhecido"
    );
    return error;
  }
};

type Props = {
  switchToLogin?: () => void;
};

const Register = ({ switchToLogin }: Props) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" action="/register" className="form">
        <h4>Cadastro</h4>
        <FormRow
          type="text"
          placeHolder="Nome"
          name="nome"
          defaultValue="joao"
        />
        <FormRow
          placeHolder="Email"
          type="email"
          name="email"
          defaultValue="joao@gmail.com"
        />
        <FormRow
          type="text"
          placeHolder="CPF"
          name="cpf"
          defaultValue="00000000000"
        />

        <FormRow
          type="password"
          placeHolder="Senha"
          name="senha"
          defaultValue="88888888"
        />
        <FormRow
          type="password"
          placeHolder="Confirmar Senha"
          name="confirmarSenha"
          defaultValue="88888888"
        />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
        <span>Já é membro?</span>
        <button type="button" className="btn btn-link" onClick={switchToLogin}>
          Login
        </button>
      </Form>
    </Wrapper>
  );
};
export default Register;
