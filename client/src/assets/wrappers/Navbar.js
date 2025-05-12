import styled from "styled-components";

const Wrapper = styled.div`
  /* Navbar */
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .navbar {
    background: var(--light-color);
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
    max-height: 150px;
    max-width: 100%;
    object-fit: contain;
    position: relative;
    bottom: -35px;
    z-index: 1100;
  }

  .toggle-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: white;
    display: none;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transform: translateY(0);
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
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

  .cta-btns .btn {
    font-weight: 500;
    font-size: 13px;
    color: white;
    width: 6rem;
    padding: 0.8rem;
    text-align: center;
    margin: 0 auto;
    font-family: "Roboto";
  }

  .login-link {
    color: var(--dark-color) !important;
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

  .user-profile-area {
    position: relative;
    display: flex;
    align-items: center;
  }

  .user-info-clickable {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px 8px;
    border-radius: var(--border-radius, 4px);
    gap: 10px;
    transition: background-color 0.2s ease-in-out;
  }

  .user-info-clickable:hover,
  .user-info-clickable:focus {
    background-color: var(--grey-100, rgba(0, 0, 0, 0.05));
  }

  .user-text-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.3;
    margin-right: 8px;
  }

  .user-display-name {
    text-transform: capitalize;
    font-weight: 600;
    font-size: 0.8rem;
    color: var(--text-color, #333);
    align-self: flex-end;
  }

  .user-username-display,
  .user-email-display {
    font-size: 0.7rem;
    color: var(--text-secondary-color, #777);
  }

  .user-avatar-container {
    order: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-icon-fa {
    font-size: 28px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--grey-200, #e9ecef);
    color: var(--primary-color, #007bff);
  }

  .profile-dropdown-toggle {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: end;
    margin-left: 2px;
    color: var(--text-secondary-color, #555);
    border-radius: var(--border-radius, 4px);
    transition: background-color 0.2s ease-in-out;
  }
  .profile-dropdown-toggle:hover {
    background-color: var(--grey-100, rgba(0, 0, 0, 0.05));
  }

  .caret-icon-fa {
    font-size: 0.9rem;
  }

  .user-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background-color: var(--background-color, white);
    border: 1px solid var(--grey-300, #ddd);
    border-radius: var(--border-radius, 4px);
    box-shadow: var(--shadow-3);
    z-index: 1050;
    min-width: 180px;
    padding: 0.5rem 0;
    display: none;
  }

  .user-dropdown.show-dropdown {
    display: block;
  }

  .user-dropdown .dropdown-btn {
    display: block;
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    padding: 0.75rem 1.2rem;
    color: var(--text-color, #333);
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: none;
  }

  .user-dropdown .dropdown-btn:hover {
    background-color: var(--grey-100, #f5f5f5);
    color: var(--primary-color-dark, #0056b3);
  }

  .avatar-img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--grey-300, #ddd);
  }

  @media (max-width: 768px) {
    .cta-btns .user-profile-area {
      width: auto;
      margin: 0.5rem auto; /* Adiciona um pouco de margem e centraliza se .cta-btns estiver em coluna */
      justify-content: center;
    }
    .user-profile-area .user-dropdown {
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    }

    .cta-btns {
      flex-direction: column;
      align-items: center;
    }

    .btn {
      font-size: 16px !important;
      width: 100%;
      max-width: 200px;
      padding: 12px;
    }

    .toggle-btn {
      color: var(--primary-color);
      display: block;
    }

    .main-menu-items {
      position: absolute;
      top: var(--nav-height);
      right: 0;
      width: 100%;
      background: rgba(255, 192, 90, 0.3);
      backdrop-filter: blur(8px);
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 1rem;
      opacity: 0;
      transform: translateY(-10px);
      transition: transform 0.3s ease-in-out;
      visibility: hidden;
      pointer-events: none;
    }

    .main-menu-items.open {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
      pointer-events: auto;
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
