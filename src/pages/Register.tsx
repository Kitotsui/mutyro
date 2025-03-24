import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Cadastro</h4>
        <FormRow type='text' name='name' defaultValue="Rogério" />
        <FormRow type='text' name='lastName' labelText='last name' defaultValue="Coutinho"/>
        <FormRow type='text' name='location' defaultValue="Minas Gerais" />
        <FormRow type='email' name='email' defaultValue="rogerio@gmail.com" />

        <FormRow type='password' name='password' defaultValue="secret123" />

        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          Já é membro?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;