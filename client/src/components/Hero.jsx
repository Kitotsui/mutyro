import { useState } from "react";
import { Login, Register } from "../pages";
import { Quote } from "../components";
import Wrapper from "../assets/wrappers/Hero";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const closeModal = () => {
    setRegisterOpen(false);
    setLoginOpen(false);
  };
  return (
    <Wrapper>
      <div className="hero">
        <div className="container hero-flex">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Mutyro</h1>
              <h2>Juntos fazemos a diferença</h2>
            </div>
            <ul className="hero-cta">
              <li className="hero-cta-item">
                <div className="ctn-btns">
                  <Link
                    to="#"
                    className="btn login-link"
                    onClick={() => setLoginOpen(true)}
                  >
                    Login
                  </Link>
                  <Link
                    to="#"
                    className="btn register-link"
                    onClick={() => setRegisterOpen(true)}
                  >
                    Cadastro
                  </Link>
                </div>
              </li>
              <li className="hero-cta-item"></li>
              <li className="hero-quotation">
                <Quote />
              </li>
            </ul>
          </div>
          <svg
            className="wave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none" // Esta linha que corrigiu o problema da altura do SVG - garante que as proporções não sejam mantidas
          >
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,192L60,170.7C120,149,240,107,360,85.3C480,64,600,64,720,101.3C840,139,960,213,1080,224C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Modal Overlay */}
      {(isRegisterOpen || isLoginOpen) && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {isRegisterOpen && <Register />}
            {isLoginOpen && <Login />}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Hero;
