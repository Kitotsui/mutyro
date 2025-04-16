import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link } from "react-router-dom";

type Props = {
  switchToRegister?: () => void;
};

const Login = ({ switchToRegister }: Props) => {
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
        <button
          type="button"
          className="btn btn-link"
          onClick={switchToRegister}
        >
          Cadastre-se
        </button>
      </form>
    </Wrapper>
  );
};
export default Login;
