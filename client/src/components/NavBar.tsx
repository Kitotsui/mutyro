import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Wrapper from "../assets/wrappers/Navbar";
import logo from "../assets/images/mutyrologo.svg";
import { useAuth } from "../context/AuthContext";
import getImageUrl from "@/utils/imageUrlHelper";

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { usuario, logout, isLoading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleHomeNavigation = () => {
    setIsOpen(false);
    setShowUserDropdown(false);
    navigate("/");
  };

  const handleLoginClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      setShowLogin(true);
      setShowRegister(false);
      setIsOpen(false);
      setShowUserDropdown(false);
    },
    [setShowLogin, setShowRegister, setIsOpen, setShowUserDropdown]
  );

  const handleRegisterClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      setShowRegister(true);
      setShowLogin(false);
      setIsOpen(false);
      setShowUserDropdown(false);
    },
    [setShowRegister, setShowLogin, setIsOpen, setShowUserDropdown]
  );

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogout = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    await logout();
    setIsOpen(false);
    setShowUserDropdown(false);
    navigate("/");
  };

  const handleProfileNavigation = () => {
    navigate("/user"); // Ou o caminho correto para o perfil do usuário
    setShowUserDropdown(false);
    setIsOpen(false);
  };

  const toggleUserDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no profileLink feche imediatamente
    setShowUserDropdown(!showUserDropdown);
  };

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown]);

  useEffect(() => {
    const currentState = location.state || {};
    let stateChanged = false;
    // const fromPath = currentState.from || "/user"; // Default redirect if 'from' is not set

    if (currentState.showLoginModal) {
      handleLoginClick();
      delete currentState.showLoginModal;
      stateChanged = true;
    } else if (currentState.showRegisterModal) {
      handleRegisterClick();
      delete currentState.showRegisterModal;
      stateChanged = true;
    }

    if (stateChanged) {
      navigate(location.pathname, { replace: true, state: currentState });
    }
  }, [location.state, navigate, handleLoginClick, handleRegisterClick]);

  if (isLoading) {
    return (
      <Wrapper>
        <nav className="navbar">
          <div className="navbar-flex container">
            {/* Logo e talvez algum placeholder de carregamento */}
            <Link to="/" aria-label="Logo Home" onClick={handleHomeNavigation}>
              <img id="navbar-logo" src={logo} alt="Mutyro Logo" />
            </Link>
            <div>Carregando usuário...</div>
          </div>
        </nav>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <nav className="navbar">
        <div className="navbar-flex container">
          <Link to="/" aria-label="Logo Home" onClick={handleHomeNavigation}>
            <img id="navbar-logo" src={logo} alt="Mutyro Logo" />
          </Link>

          <button
            className="toggle-btn"
            onClick={() => {
              setIsOpen(!isOpen);
              setShowUserDropdown(false);
            }}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          <div className={`main-menu-items ${isOpen ? "open" : ""}`}>
            <ul className="main-menu-list">
              <li>
                <Link
                  to="/"
                  className="nav-link"
                  onClick={handleHomeNavigation}
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/mutiroes"
                  className="nav-link"
                  onClick={() => {
                    setIsOpen(false);
                    setShowUserDropdown(false);
                  }}
                >
                  Mutirões
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="nav-link"
                  onClick={() => {
                    setIsOpen(false);
                    setShowUserDropdown(false);
                  }}
                >
                  Sobre
                </Link>
              </li>
              <li>
                <div className="cta-btns">
                  {isLoading ? null : !usuario ? (
                    <>
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
                    </>
                  ) : (
                    <div className="user-profile-area" ref={dropdownRef}>
                      <div
                        className="user-info-clickable"
                        onClick={handleProfileNavigation}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleProfileNavigation()
                        }
                      >
                        <div className="user-text-details">
                          <span className="user-display-name">
                            {usuario.nome}
                          </span>
                          <span className="user-email-display">
                            {usuario.email}
                          </span>
                        </div>
                        <div className="user-avatar-container">
                          <img
                            src={getImageUrl(usuario?.avatar)}
                            alt={`Avatar de ${usuario.nome}`}
                            className="avatar-img"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="profile-dropdown-toggle"
                        onClick={toggleUserDropdown}
                        aria-label="Abrir menu do usuário"
                        aria-haspopup="true"
                        aria-expanded={showUserDropdown}
                      >
                        <i className="fas fa-caret-down caret-icon-fa"></i>
                      </button>
                      {showUserDropdown && (
                        <div className="user-dropdown show-dropdown">
                          <button
                            type="button"
                            className="dropdown-btn"
                            onClick={handleLogout}
                          >
                            Sair
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showLogin && (
        <div className="modal-overlay" onClick={handleCloseModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Login
              switchToRegister={handleRegisterClick}
              closeModal={handleCloseModals}
            />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal-overlay" onClick={handleCloseModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Register
              switchToLogin={handleLoginClick}
              closeModal={handleCloseModals}
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default NavBar;
