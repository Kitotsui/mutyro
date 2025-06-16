import styled from "styled-components";

const Wrapper = styled.div`
  .search-form {
    display: flex;
    align-items: center;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-1);
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  .search-input {
    flex-grow: 1;
    border: none;
    background: transparent;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: var(--text-color);
  }
  .search-input:focus {
    outline: none;
  }
  .search-btn {
    background: var(--primary-100);
    color: var(--white);
    border: none;
    padding: 0.75rem 1.25rem;
    cursor: pointer;
    transition: var(--transition);
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }
  .search-btn:hover {
    background: var(--primary-300);
  }
`;

export default Wrapper;
