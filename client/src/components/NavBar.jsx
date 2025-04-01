import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/mutyrologo.svg";
import Wrapper from "../assets/wrappers/NavBar";
import { Login, Register } from "../pages";

const NavBar = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openRegisterModal = (e) => {
    e.preventDefault(); // Prevent navigation
    setRegisterOpen(true); // Open Register Modal
  };

  const openLoginModal = (e) => {
    e.preventDefault(); // Prevent navigation
    setLoginOpen(true); // Open Login Modal
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
                <a href="/">Menu</a>
              </li>
              <li>
                <a href="#">Menu</a>
              </li>
              <li>
                <a href="#">Menu</a>
              </li>
              <li>
                <a href="#">Menu</a>
              </li>
              <li>
                <Link
                  to="/register"
                  className="btn register-link"
                  onClick={openRegisterModal}
                >
                  Cadastro
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="btn register-link"
                  onClick={openLoginModal}
                >
                  Login
                </Link>
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
