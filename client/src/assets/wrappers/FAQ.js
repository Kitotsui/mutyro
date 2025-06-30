import styled from "styled-components";

const Wrapper = styled.section`
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3rem 1rem 2rem 1rem;
  background: var(--light-bg);

  .faq-container {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.07);
    max-width: 800px;
    width: 100%;
    padding: 2.5rem 2rem 2rem 2rem;
    margin: 0 auto;
    margin-bottom: 2rem;
  }

  .faq-title {
    font-family: 'Lato', 'Open Sans', Arial, sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-100);
    text-align: center;
    margin-bottom: 2.5rem;
    letter-spacing: -1px;
  }

  .faq-item {
    margin-bottom: 2.2rem;
    border-bottom: 1px solid var(--grey-200);
    padding-bottom: 1.5rem;
  }

  .faq-question {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-50);
    margin-bottom: 0.5rem;
    font-family: 'Lato', 'Open Sans', Arial, sans-serif;
  }

  .faq-answer {
    color: var(--dark-color);
    font-size: 1.08rem;
    line-height: 1.7;
    font-family: 'Open Sans', Arial, sans-serif;
  }

  @media (max-width: 600px) {
    .faq-container {
      padding: 1.2rem 0.5rem;
    }
    .faq-title {
      font-size: 2rem;
    }
    .faq-question {
      font-size: 1.1rem;
    }
    .faq-answer {
      font-size: 1rem;
    }
  }
`;

export default Wrapper; 