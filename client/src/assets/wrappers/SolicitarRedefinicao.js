import styled from "styled-components";

const Wrapper = styled.div`
  background: var(--background-color);
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .terms-container {
    background: var(--white);
    padding: 2rem 3rem;
    border-radius: 1.5rem;
    box-shadow: var(--shadow-3);
    max-width: 800px;
    width: 100%;
    font-family: "Open Sans", sans-serif;
    color: var(--grey-800);
  }

  .contact-section {
    h2 {
      margin-bottom: 1rem;
    }
    max-width: 700px;
    margin: 4rem auto;
    text-align: center;
  }

  .contact-form {
    margin-top: 2rem;
    text-align: left;
  }

  .contact-form .form-group {
    margin-bottom: 1.5rem;
  }

  .contact-form label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
  }

  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--grey-300);
    border-radius: var(--border-radius);
    font-size: 1rem;
    box-sizing: border-box;
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px var(--primary-100);
  }

  .contact-form .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .contact-form .submit-btn {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    background: var(--primary-color);
    color: var(--white);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
  }

  .contact-form .submit-btn:hover {
    background: var(--secondary-color);
  }
`;

export default Wrapper;
