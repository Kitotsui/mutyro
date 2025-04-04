import styled from "styled-components";

const Wrapper = styled.div`
  /* Navbar */
  .navbar {
    background: var(--light-color); /*Temp*/
    color: white;
    padding: 1rem 2rem;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    transition: background-color 0.5s ease-in-out;
    height: var(--nav-height);
    background: var(--background-secondary-color);
    box-shadow: var(--shadow-2);
  }

  .navbar-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar .main-menu-list {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-weight: 600;
  }

  .navbar .nav-link {
    color: var(--dark-color);
  }

  .navbar .nav-link:hover {
    color: var(--secondary-color);
  }

  .navbar i {
    font-size: 1.5rem;
  }

  .navbar #navbar-logo {
    max-height: 150px; /* Make the logo larger (adjust as needed) */
    max-width: 100%; /* Ensures the logo doesn’t overflow horizontally */
    object-fit: contain; /* Ensures the aspect ratio is maintained */
    position: relative; /* Allows the logo to "leak" without affecting the layout */
    bottom: -35px;
  }

  .toggle-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: white;
    display: none; /* Escondido no desktop */
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transform: translateY(0);
    background: rgba(0, 0, 0, 0.5); /* Dark overlay */
    backdrop-filter: blur(5px); /* Blur effect */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .cta-btns {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  .btn {
    font-size: 14px;
    color: white;
    width: 6rem;
    padding: 0.8rem;
    text-align: center;
    margin: 0 auto;
  }

  .login-link {
    color: var(--dark-color);
    background-color: var(--light-color);
  }

  .modal-content {
    background: white;
    border-radius: 8px;
    box-shadow: var(--shadow-2);
    position: relative;
    text-align: center;
    transform: translateY(0);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    .toggle-btn {
      color: var(--primary-color);

      display: block; /* Mostra o botão hambúrguer */
    }

    .main-menu-items {
      position: absolute;
      top: var(--nav-height);
      right: 0;
      width: 100%;
      background: rgba(13, 109, 235, 0.3);
      backdrop-filter: blur(10px);
      display: none;
      flex-direction: column;
      text-align: center;
      padding: 1rem;
    }

    .main-menu-items.open {
      display: flex;
    }

    .main-menu-list {
      flex-direction: column;
      gap: 1rem;
    }

    .main-menu-list a {
      font-size: 1.2rem;
    }
  }
`;
export default Wrapper;
