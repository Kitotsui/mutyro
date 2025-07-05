import styled from "styled-components";

const Wrapper = styled.div`
  background: var(--background-color);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Open Sans", sans-serif;

  .error-container {
    text-align: center;
    background: var(--white);
    padding: 3rem 2rem;
    border-radius: 1.5rem;
    box-shadow: var(--shadow-3);
    max-width: 500px;
    width: 100%;
  }

  h1 {
    font-size: 6rem;
    font-weight: 700;
    color: var(--primary-900);
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--grey-800);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: var(--grey-600);
    margin-bottom: 2rem;
  }

  .back-btn {
    display: inline-block;
    padding: 0.8rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--white);
    background: var(--primary-100);
    border: none;
    border-radius: 1.2rem;
    text-decoration: none;
    box-shadow: var(--shadow-2);
    transition: background 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      background: var(--primary-300);
      box-shadow: var(--shadow-3);
    }
  }
`;

export default Wrapper;
