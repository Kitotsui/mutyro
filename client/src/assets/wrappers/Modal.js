import styled from "styled-components";

const Wrapper = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 500px;
    text-align: center;
  }
  h1 {
    font-size: 1.5rem;
  }
  .modal-body {
    margin: 1rem 0;
  }
  .modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .inscrito-item {
    display: flex;
    justify-content: space-between; /* Alinha os itens nas extremidades */
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd; /* Linha separadora opcional */
  }
  .inscrito-nome {
    text-align: left; /* Alinha o nome à esquerda */
    flex: 1; /* Faz o nome ocupar o espaço disponível */
  }
  .inscrito-email {
    text-align: right; /* Alinha o email à direita */
    flex: 1; /* Faz o email ocupar o espaço disponível */
  }
  .print-btn,
  .close-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: var(--primary-100);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .print-btn:hover,
  .close-btn:hover {
    background: var(--primary-50);
  }
`;

export default Wrapper;