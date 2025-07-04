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

  input {
    width: 100%;
    padding: 0.75rem 1rem;
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
    font-size: 1rem;
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
    color: var(--primary-100);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }

  .link-esqueci {
    color: var(--grey-400);
    font-weight: 400;
    font-size: 0.875rem;
    display: block;
    text-align: center;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: var(--primary-600);
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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s;
    &:hover {
      background: var(--grey-100);
      border-color: var(--grey-300);
    }
  }

  .switch-btn {
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
`;

export default Wrapper;
