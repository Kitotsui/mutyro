import styled from "styled-components";

const Wrapper = styled.div`
  .container {
    min-height: 100vh;
    background-color: #f8fafc;
  }

  main {
    max-width: 72rem;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .form-container {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 2rem;
    text-align: center;
  }

  .form-section {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .photo-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    .photo-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background-color: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      color: #64748b;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #cbd5e1;
      }
    }

    .upload-btn {
      background: none;
      border: 1px solid #0d9488;
      color: #0d9488;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;

      &:hover {
        background-color: #f0fdfa;
      }
    }
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #1e293b;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: #0d9488;
      }
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }
  }

  .task-input {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;

    input {
      flex: 1;
    }

    button {
      background-color: #0d9488;
      color: white;
      border: none;
      padding: 0.5rem;
      border-radius: 0.375rem;
      cursor: pointer;

      &:hover {
        background-color: #0f766e;
      }
    }
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .task-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background-color: #f8fafc;
      border-radius: 0.375rem;

      span {
        flex: 1;
      }

      button {
        background: none;
        border: none;
        color: #ef4444;
        cursor: pointer;
        padding: 0.25rem;

        &:hover {
          color: #dc2626;
        }
      }
    }
  }

  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;

    input[type="checkbox"] {
      width: auto;
    }
  }

  .submit-btn {
    width: 100%;
    background-color: #0d9488;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0f766e;
    }

    &:disabled {
      background-color: #94a3b8;
      cursor: not-allowed;
    }
  }
`; 