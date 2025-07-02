import styled from "styled-components";

const Wrapper = styled.div`
  background: var(--background-color);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .policy-container {
    background: var(--white);
    padding: 2rem 3rem;
    border-radius: 1.5rem;
    box-shadow: var(--shadow-3);
    max-width: 800px;
    width: 100%;
    font-family: "Open Sans", sans-serif;
    color: var(--grey-800);
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-100);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-100);
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  ul {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    list-style-type: disc;
  }

  ul li {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--grey-700);
  }

  a {
    color: var(--primary-100);
    text-decoration: underline;
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary-300);
    }
  }
`;

export default Wrapper;
