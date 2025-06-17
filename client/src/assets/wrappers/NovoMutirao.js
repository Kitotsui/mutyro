import styled from "styled-components";

const Wrapper = styled.div`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  main {
    margin-top: 2rem;
  }

  h1 {
    font-size: 1.5rem;
    color: var(--text-color);
    margin-bottom: 2rem;
  }

  .form-container {
    background: var(--white);
    border-radius: 0 0 1rem 1rem;
    padding: 2rem;
    box-shadow: var(--shadow-2);
  }

  form {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
  }

  .image-section {
    h3 {
      font-size: 1rem;
      margin-bottom: 1rem;
      color: var(--text-color);
    }
  }

  .image-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .upload-placeholder {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: var(--primary-100);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1rem;
  }

  .preview-image {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
  }

  .upload-btn {
    width: 160px;
    background: none;
    border: 1px solid var(--grey-300);
    color: var(--grey-600);
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
      background: var(--grey-50);
      border-color: var(--grey-400);
    }
  }

  .form-section {
    display: grid;
    gap: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.9rem;
      color: var(--text-color);
    }

    input[type="text"],
    input[type="date"],
    input[type="time"],
    textarea,
    select {
      padding: 0.75rem;
      border: 1px solid var(--grey-200);
      border-radius: 0.5rem;
      background: var(--white);
      font-size: 0.9rem;

      &:focus {
        border-color: var(--primary-500);
        outline: none;
      }

      &::placeholder {
        color: var(--grey-400);
      }
    }

    input[type="date"],
    input[type="time"] {
      color: var(--text-color);

      &::-webkit-calendar-picker-indicator {
        cursor: pointer;
      }
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }

    input,
    textarea,
    select {
      font-family: inherit;
    }
  }

  .form-header {
    background-color: var(--primary-100);
    width: 100%;
    padding: 4rem 2rem;
    border-radius: 16px 16px 0 0;
    h2 {
      font-size: 2rem;
      font-weight: 500;
      text-transform: uppercase;
      color: var(--light-color);
    }
  }

  .tarefa-input {
    display: flex;
    gap: 1rem;
    align-items: center;

    input {
      flex: 1;
    }
  }

  .add-btn {
    background: var(--primary-100);
    color: var(--white);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
    align-self: flex-start;
    font-size: 0.9rem;

    &:hover {
      background: var(--primary-50);
    }
  }

  .remove-btn {
    background: var(--red-light);
    color: var(--red-dark);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
    font-size: 0.9rem;

    &:hover {
      background: var(--red-dark);
      color: var(--white);
    }
  }

  .radio-group {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    input[type="radio"] {
      cursor: pointer;
    }
  }

  .terms {
    label {
      display: flex;
      gap: 0.5rem;
      align-items: flex-start;
      font-size: 0.9rem;
      color: var(--text-color);
      cursor: pointer;
    }

    input[type="checkbox"] {
      margin-top: 0.25rem;
      cursor: pointer;
    }
  }

  .button-group {
    grid-column: 1 / -1;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--grey-100);

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: var(--transition);
    }

    .cancel-btn {
      background: var(--grey-100);
      border: none;
      color: var(--text-color);

      &:hover {
        background: var(--grey-200);
      }
    }

    .submit-btn {
      background: var(--primary-100);
      border: none;
      color: var(--white);

      &:hover {
        background: var(--primary-50);
      }
    }
  }

  .image-section {
    text-align: center;
    img {
      width: 12rem;
      height: 12rem;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: var(--shadow-2);
      border: 4px solid var(--white);
      background: var(--grey-100);
    }
  }

  @media (max-width: 768px) {
    form {
      grid-template-columns: 1fr;
    }

    .image-section {
      text-align: center;
    }

    .form-row {
      grid-template-columns: 1fr;
    }
  }
`;

export default Wrapper;
