import styled from "styled-components";

const Wrapper = styled.section`
  min-height: fit-content;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    margin: 0 auto;
    max-width: 450px;
    background: var(--white);
    border-radius: 12px;
    box-shadow: var(--shadow-2);
    padding: 2rem;
    border: 1px solid var(--grey-100);
  }
  h4 {
    font-size: 36px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 2rem;
    color: var(--grey-800);
  }
  span {
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: var(--dark-color);
  }

  .input-container {
    position: relative;
    width: 100%;
    
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 3rem;
    border-radius: 8px;
    background: var(--grey-150);
    border: 1px solid transparent;
    transition: all 0.2s;
    outline: none;
    &:focus {
      border-color: var(--primary-500);
      background: var(--white);
      box-shadow: none;
    }
  }

  .password-toggle {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: var(--grey-500);
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      color: var(--primary-500);
      background: transparent;
    }
    
    &:focus {
      outline: none;
      color: var(--primary-500);
      background: transparent;
    }
    
    &:active {
      background: transparent;
    }
    
    svg {
      width: 16px;
      height: 16px;
    }
  }

  .btn {
    display: block;
    margin: 10px auto;
    width: 100%;
    text-align: center;
    background: var(--primary-100);
    color: var(--white);
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background: var(--primary-50);
      transform: scale(1.01);
    }
    &:active {
      transform: scale(0.99);
    }
  }
  .member-btn {
    background: transparent;
    border: none;
    color: var(--primary-100);
    font-size: 1rem;
    font-weight: 500;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      color: var(--primary-50);
      text-decoration: underline;
    }
  }

  .link-esqueci {
    color: var(--grey-400);
    font-weight: 400;
    font-size: 0.875rem;
    display: inline;
    text-align: center;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: var(--primary-color);
    }
  }

  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0.5rem 0;
    .line {
      height: 1px;
      background: var(--grey-200);
      flex: 1;
    }
    span {
      color: var(--grey-500);
      font-size: 0.875rem;
    }
  }

  .btn-link {
    background: var(--grey-50);
    color: var(--grey-800);
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    padding: 12px 16px;
    margin-top: 5px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
      background: var(--grey-100);
      border-color: var(--grey-300);
    }
  }

  .switch-btn {
    background: transparent;
    color: var(--dark-color);
    border: 1px solid var(--grey-300);
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background-color: var(--grey-100);
      color: var(--dark-color);
    }
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    font-size: 0.9rem;
    color: var(--grey-700);

    input[type="checkbox"] {
      margin-right: 0.5rem;
      transform: scale(1.2);
    }

    a {
      color: var(--primary-color);
      text-decoration: underline;
      transition: color 0.3s ease;

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .termos {

    .side-checkbox {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      margin-bottom: 1rem;
      input[type="checkbox"] {
        width: 1.1rem;
        height: 1.1rem;
        accent-color: var(--grey-300);
      }
      span {
        font-size: 0.95rem;
        color: var(--grey-700);
        width: 100%;
      }
    }
  }
  .termos {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 0.85rem;
  }

  .termos input {
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  .termos a {
    white-space: nowrap;
  }
`;

export default Wrapper;
