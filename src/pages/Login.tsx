import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' defaultValue='rogerio@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <button type='button' className='btn btn-block'>
          Esqueci minha senha
        </button>
        <p>
          Ainda não tem conta?
          <Link to='/register' className='member-btn'>
            Cadastrar-se
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;