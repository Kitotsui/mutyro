// src/assets/wrappers/MutiraoCadastroWrapper.js
import styled from "styled-components";

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5); /* overlay escuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .cadastro-container {
  background: #fff;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  padding-bottom: 4rem; /* aumenta espaço inferior */
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

  h4 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.3rem;
    color: #555;
  }

  input, textarea {
    width: 100%;
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    resize: none;
  }

  .btn {
    background-color: #007aff;
    color: white;
    padding: 0.6rem 1rem;
    margin-top: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .btn-cancelar {
    background-color: #ccc;
    margin-left: 1rem;
  }

  .btn:hover {
    opacity: 0.9;
  }
  .checkbox-group {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 0.5rem;
  transform: scale(1.3);
  accent-color: #007aff; /* cor azul do botão */
  cursor: pointer;
}
`;

export default Wrapper;
