import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <h4>Login</h4>
        <FormRow
          placeHolder="Usuário ou Email"
          type="email"
          name=""
          defaultValue="rogerio@gmail.com"
        />
        <FormRow
          placeHolder="Senha"
          type="password"
          name=""
          defaultValue="secret123"
        />
        <button type="submit" className="btn btn-block">
          Login
        </button>
        <Link to="/forgot-password" type="button" className="link-esqueci">
          Esqueci minha senha
        </Link>
        <span>Ainda não tem conta?</span>
        <Link to="/register" className="btn btn-link">
          Cadastre-se
        </Link>
      </form>
    </Wrapper>
  );
};
export default Login;
