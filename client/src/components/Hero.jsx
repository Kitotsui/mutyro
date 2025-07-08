import { useState } from "react";
import { Login, Register } from "../pages";
import { Quote } from "../components";
import Wrapper from "../assets/wrappers/Hero";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const { usuario } = useAuth();
  const { t } = useTranslation();

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
              <h1>{t('hero.titulo')}</h1>
              <h2>{t('hero.subtitulo')}</h2>
            </div>
            <ul className="hero-cta">
              <li className="hero-cta-item">
                {!usuario && (
                  <div className="ctn-btns">
                    <Link
                      to="#"
                      className="btn login-link"
                      onClick={() => setLoginOpen(true)}
                    >
                      {t('navbar.login')}
                    </Link>
                    <Link
                      to="#"
                      className="btn register-link"
                      onClick={() => setRegisterOpen(true)}
                    >
                      {t('navbar.cadastro')}
                    </Link>
                  </div>
                )}
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
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Modal Overlay */}
      {(isRegisterOpen || isLoginOpen) && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {isRegisterOpen && (
              <Register
                closeModal={closeModal}
                switchToLogin={() => {
                  setRegisterOpen(false);
                  setLoginOpen(true);
                }}
              />
            )}
            {isLoginOpen && (
              <Login
                switchToRegister={() => {
                  setLoginOpen(false);
                  setRegisterOpen(true);
                }}
              />
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Hero;
