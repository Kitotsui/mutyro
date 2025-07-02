import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Error404";

const Error404 = () => {
  return (
    <Wrapper>
      <div className="error-container">
        <div className="error-content">
          <h1>404</h1>
          <h2>Página não encontrada</h2>
          <p>
            Desculpe, a página que você está tentando acessar não existe ou foi
            removida.
          </p>
          <Link to="/" className="back-btn">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Error404;
