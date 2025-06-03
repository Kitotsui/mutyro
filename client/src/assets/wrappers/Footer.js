import styled from "styled-components";

const Wrapper = styled.footer`
  /* Footer */
  .footer {
    background: var(--light-color);
    color: var(--dark-color);
    border-top: #384653;
    padding: 0.5rem 2rem;
  }

  .footer-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
  }

  a {
    color: var(--dark-color);
  }

  a:hover {
    color: var(--secondary-color);
  }

  .footer ul {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
  }
  @media (max-width: 768px) {
    img {
      width: 4rem;
    }
    .footer-flex,
    .footer ul {
      margin: 0;
      gap: 1rem;
      flex-direction: column;
    }
  }
`;

export default Wrapper;
