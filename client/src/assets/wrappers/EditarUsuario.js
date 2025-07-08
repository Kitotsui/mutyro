import styled from "styled-components";

const Wrapper = styled.div`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .form-header {
    background: var(--primary-100);
    position: relative;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: 2rem 2.5rem;
    color: var(--light-color);
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: var(--bg-url);
      background-size: auto;
      background-position: center;
      opacity: 0.1;
      z-index: 1;
      pointer-events: none;
    }
    background-color: var(--primary-100);
    width: 100%;
    padding: 4rem 2rem;
    border-radius: 16px 16px 0 0;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 1px;
      color: var(--light-color);
      margin-bottom: 0.2rem;
      z-index: 100;
    }
    .form-subtitle {
      background: rgba(255, 255, 255, 0.18);
      padding: 0.25rem 1rem;
      border-radius: 999px;
      font-size: 0.95rem;
      font-weight: 500;
      display: inline-block;
      margin-bottom: 0.3rem;
      z-index: 100;
    }
  }

  h1 {
    font-size: 1.5rem;
    color: var(--text-color);
    margin-bottom: 2rem;
    text-align: center;
  }

  .form-container {
    background: var(--grey-50);
    padding: 1.5rem 1.5rem 1.2rem 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-1);

    border-radius: 0 0 1rem 1rem;
    padding: 2rem;
    box-shadow: var(--shadow-2);
    label,
    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--primary-900) !important;
      margin-bottom: 0.7rem;
      gap: 0.5rem;
    }
  }

  input,
  textarea,
  select {
    font-family: inherit;
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

    input[type="date"] {
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
      padding: 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

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
