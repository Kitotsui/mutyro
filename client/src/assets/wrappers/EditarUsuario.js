import styled from 'styled-components';

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
    text-align: center;
  }

  .form-container {
    background: var(--white);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: var(--shadow-2);
  }

  form {
    display: grid;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.9rem;
      color: var(--text-color);
    }

    input,
    textarea {
      padding: 0.75rem;
      border: 1px solid var(--grey-200);
      border-radius: 0.5rem;
      background: var(--white);
      font-size: 0.9rem;
    }

    input[type='date'] {
      color: var(--text-color);
    }

    textarea {
      min-height: 100px;
    }
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

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      cursor: pointer;
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
`;

export default Wrapper;
