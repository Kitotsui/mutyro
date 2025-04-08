import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import {toast} from 'react-toastify';

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
    toast.success('Cadastro realizado com sucesso!');
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

const Register = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Cadastro</h4>
        <FormRow type="text" name="name" defaultValue="Rogério" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Coutinho"
        />
        <FormRow type="text" name="location" defaultValue="Minas Gerais" />
        <FormRow type="email" name="email" defaultValue="rogerio@gmail.com" />

        <FormRow type="password" name="password" defaultValue="secret123" />

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <span>Já é membro?</span>
        <Link to="/login" className="btn btn-link">
          Login
        </Link>
      </Form>
    </Wrapper>
  );
};
export default Register;
