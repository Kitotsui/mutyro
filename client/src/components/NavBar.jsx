import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Wrapper from "../assets/wrappers/Navbar";
import logo from "../assets/images/mutyrologo.svg";

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLogin(true);
    setShowRegister(false);
    setIsOpen(false);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setShowRegister(true);
    setShowLogin(false);
    setIsOpen(false);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <Wrapper>
      <nav className="navbar">
        <div className="navbar-flex container">
          <Link to="/" aria-label="Logo Home">
            <img id="navbar-logo" src={logo} alt="Mutyro Logo" />
          </Link>

          <button
            className="toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          <div className={`main-menu-items ${isOpen ? "open" : ""}`}>
            <ul className="main-menu-list">
              <li>
                <Link to="/" className="nav-link">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/mutiroes" className="nav-link">
                  Mutirões
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="nav-link">
                  Sobre
                </Link>
              </li>
              <li>
                <div className="cta-btns">
                  <button
                    className="btn register-link"
                    onClick={handleRegisterClick}
                  >
                    Cadastro
                  </button>
                  <button
                    className="btn login-link"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showLogin && (
        <div className="modal-overlay" onClick={handleCloseModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Login switchToRegister={handleRegisterClick} />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal-overlay" onClick={handleCloseModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Register switchToLogin={handleLoginClick} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default NavBar;
