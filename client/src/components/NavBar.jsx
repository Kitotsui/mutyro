import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/mutyrologo.svg";
import Wrapper from "../assets/wrappers/Navbar";
import { Login, Register} from "../pages";

const NavBar = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openRegisterModal = (e) => {
    e.preventDefault(); 
    setRegisterOpen(true); 
  };

  const openLoginModal = (e) => {
    e.preventDefault(); 
    setLoginOpen(true); 
  };

  return (
    <Wrapper>
      <nav className="navbar">
        <div className="navbar-flex container">
          <a href="/" aria-label="Logo Home">
            <img id="navbar-logo" src={logo} alt="Mutyro Logo" />
          </a>

          {/* Botão de Menu para Mobile */}
          <button
            className="toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* Menu Principal */}
          <div className={`main-menu-items ${isOpen ? "open" : ""}`}>
            <ul className="main-menu-list">
              <li>
                <a href="/" className="nav-link">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Menu
                </a>
              </li>
              <li>
                <div className="cta-btns">
                  <Link
                    to="/register"
                    className="btn register-link"
                    onClick={openRegisterModal}
                  >
                    Cadastro
                  </Link>
                  <Link
                    to="/login"
                    className="btn login-link"
                    onClick={openLoginModal}
                  >
                    Login
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Registration Modal */}
      {isRegisterOpen && (
        <div className="modal-overlay" onClick={() => setRegisterOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <Register />
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal-overlay" onClick={() => setLoginOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <Login />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default NavBar;
