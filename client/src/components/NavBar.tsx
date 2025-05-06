import { useState, useEffect, useRef } from "react"; // Adicionado useRef
import { Link, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Wrapper from "../assets/wrappers/Navbar";
import logo from "../assets/images/mutyrologo.svg";
import { useAuth } from "../context/AuthContext";

interface Usuario {
  _id: string;
  nome: string;
  email?: string;
  avatar?: string;
  username?: string;
}

const mockAvatarUrl = "https://i.pravatar.cc/150?img=11";

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Menu hamburguer
  const [showUserDropdown, setShowUserDropdown] = useState(false); // Dropdown de logout
  const { usuario, logout } = useAuth() as {
    usuario: Usuario | null;
    logout: () => Promise<void>;
  };
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref para o container do dropdown

  // ... (useEffect para log do usuário) ...

  const handleLoginClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setShowLogin(true);
    setShowRegister(false);
    setIsOpen(false);
    setShowUserDropdown(false);
  };

  const handleRegisterClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setShowRegister(true);
    setShowLogin(false);
    setIsOpen(false);
    setShowUserDropdown(false);
  };

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
    setIsOpen(false);
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

  return (
    <Wrapper>
      <nav className="navbar">
        <div className="navbar-flex container">
          <Link
            to="/"
            aria-label="Logo Home"
            onClick={() => {
              setIsOpen(false);
              setShowUserDropdown(false);
            }}
          >
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
              {/* ... (Links de Início, Mutirões, Sobre) ... */}
              <li>
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    setIsOpen(false);
                    setShowUserDropdown(false);
                  }}
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
                  {!usuario ? (
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
                    // NOVO LAYOUT PARA USUÁRIO LOGADO
                    <div className="user-profile-area" ref={dropdownRef}>
                      <div
                        className="user-info-clickable"
                        onClick={handleProfileNavigation}
                        role="button" // Para acessibilidade
                        tabIndex={0} // Para acessibilidade
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleProfileNavigation()
                        } // Para acessibilidade
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
                            // Se usuario.avatar existir (do backend), usa ele. Senão, usa o mock.
                            src={usuario.avatar || mockAvatarUrl}
                            alt={`Avatar de ${usuario.nome}`}
                            className="avatar-img" // Você precisará de estilos para .avatar-img
                          />
                          {/* <i className="fas fa-user-circle avatar-icon-fa"></i> */}
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
                        <i className="fas fa-caret-down caret-icon-fa"></i>{" "}
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

      {/* ... (Modais de Login e Register) ... */}
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
