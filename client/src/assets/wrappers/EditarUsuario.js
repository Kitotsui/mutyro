import styled from "styled-components";

const Wrapper = styled.div`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    font-size: 1.5rem;
    color: var(--text-color);
    margin-bottom: 2rem;
  }

  .form-container {
    background: var(--white);
    border-radius: 1rem;
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
    gap: 0.5rem; /* menos gap para o botão ficar logo abaixo */
    margin-bottom: 0; /* tirar margem extra */
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
    margin-bottom: 0; /* remove espaço embaixo */

    &:hover {
      background: var(--grey-50);
      border-color: var(--grey-400);
    }
  }

  .form-section {
    display: grid;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem; /* espaçamento maior entre campos */

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

  @media (max-width: 768px) {
    form {
      grid-template-columns: 1fr;
    }

    .image-section {
      text-align: center;
    }
  }
`;

export default Wrapper;
