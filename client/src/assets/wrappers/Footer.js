import styled from "styled-components";

const Wrapper = styled.footer`
  .footer {
    background: var(--light-color);
    color: var(--dark-color);
    padding: 1.5rem 2rem;
    width: 100%;
    box-sizing: border-box;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-left img {
    width: 6rem;
    height: auto;
  }

  .footer-links {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-links a {
    color: var(--dark-color);
    text-decoration: none;
  }

  .footer-links a:hover {
    color: var(--secondary-color);
  }

  .footer-copy {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      align-items: center;
    }

    .footer-left img {
      width: 4rem;
    }

    .footer-links {
      flex-direction: column;
      gap: 0.75rem;
    }
  }
`;

export default Wrapper;
