import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <h4>Cadastro</h4>
        <FormRow
          type="text"
          placeHolder="Nome"
          name=""
          defaultValue="Rogério"
        />
        <FormRow
          placeHolder="Email"
          type="email"
          name=""
          defaultValue="rogerio@gmail.com"
        />
        <FormRow
          type="text"
          placeHolder="CPF"
          name=""
          defaultValue="000.000.000-00"
        />

        <FormRow
          type="password"
          placeHolder="Senha"
          name=""
          defaultValue="secret123"
        />
        <FormRow
          type="password"
          placeHolder="Confirmar Senha"
          name=""
          defaultValue="secret123"
        />

        <button type="submit" className="btn btn-block">
          Cadastrar
        </button>
        <span>Já é membro?</span>
        <Link to="/login" className="btn btn-link">
          Login
        </Link>
      </form>
    </Wrapper>
  );
};
export default Register;
