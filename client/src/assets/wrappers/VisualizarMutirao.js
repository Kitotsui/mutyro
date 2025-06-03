import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--grey-50);
  font-family: "Open Sans", sans-serif;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .content-container {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }

  .image-section {
    .image-container {
      border-radius: 0.5rem;
      overflow: hidden;
      margin-bottom: 1rem;

      img {
        width: 100%;
        height: 400px;
        object-fit: cover;
      }

      .image-credit {
        text-align: right;
        font-size: 0.75rem;
        color: var(--grey-500);
        margin-top: 0.25rem;
      }
    }

    .mutirao-image {
      width: 100%;
      height: 30%;
      object-fit: cover; /* Mantém a proporção e cobre o container */
      object-position: center; /* Centraliza a imagem */
    }

    .autor-info {
      background: var(--grey-50);
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--grey-100);

      span {
        color: var(--grey-600);
        font-size: 0.875rem;
      }

      h3 {
        margin-top: 0.25rem;
        color: var(--grey-900);
        font-weight: 600;
      }
    }
  }

  .info-section {
    h1 {
      color: var(--grey-900);
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }

    .date-author {
      color: var(--grey-600);
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }

    .section {
      margin-bottom: 1.5rem;

      h2 {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--grey-900);
      }

      .section-description {
        color: var(--grey-600);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }
    }

    .location-box {
      background: var(--orange-50);
      border: 1px solid var(--orange-200);
      border-radius: 0.5rem;
      padding: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .location-icon {
        width: 1.25rem;
        height: 1.25rem;
        color: var(--orange-500);
      }

      span {
        font-size: 0.875rem;
        color: var(--grey-700);
      }
    }

    .tasks-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .task-item {
        padding: 0.75rem;
        border: 1px solid var(--grey-200);
        border-radius: 0.5rem;
        transition: all 0.2s;

        &:hover {
          border-color: var(--primary-300);
          background: var(--grey-50);
        }

        p {
          font-size: 0.875rem;
          color: var(--grey-700);
        }
      }
    }

    .checkbox-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .checkbox-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        border: 1px solid var(--grey-200);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          border-color: var(--primary-300);
          background: var(--grey-50);
        }

        span {
          font-size: 0.875rem;
          color: var(--grey-700);
        }

        input[type="checkbox"] {
          width: 1rem;
          height: 1rem;
          border-radius: 0.25rem;
          border-color: var(--grey-300);
          color: var(--primary-600);

          &:focus {
            ring: 2px;
            ring-color: var(--primary-500);
          }
        }
      }
    }

    .termo-container {
      display: flex;
      gap: 0.75rem;
      margin-top: 0.75rem;
      cursor: pointer;

      .checkbox-wrapper {
        display: flex;
        align-items: flex-start;
        height: 1.25rem;

        input[type="checkbox"] {
          width: 1rem;
          height: 1rem;
          border-radius: 0.25rem;
          border-color: var(--grey-300);
          color: var(--primary-600);
        }
      }

      .termo-text {
        margin-left: 0.75rem;

        p {
          font-size: 0.875rem;
          color: var(--grey-700);
          line-height: 1.5;
        }
      }
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      flex-direction: column;
      width: 100%;

      .back-btn {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 500;
        background: var(--grey-100);
        color: var(--grey-700);
        border: 1px solid var(--grey-200);
        transition: all 0.2s;
        font-size: 1rem;

        &:hover {
          background: var(--grey-200);
          transform: scale(1.02);
          cursor: pointer;
        }

        &:active {
          transform: scale(0.98);
        }
      }

      .submit-btn {
        flex: 1;
        background: var(--primary-100);
        color: white;
        font-weight: 500;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        border: none;
        transition: all 0.2s;
        font-size: 1rem;

        &:hover {
          background: var(--primary-50);
          transform: scale(1.02);
          cursor: pointer;
        }

        &:active {
          transform: scale(0.98);
        }

        &.disabled {
          opacity: 0.5;
          cursor: not-allowed;

          &:hover {
            background: var(--orange-500);
            transform: none;
          }
        }
      }

      .edit-btn {
        flex: 1;
        background: var(--primary-100);
        color: white;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: none;
        transition: all 0.2s;
        font-size: 1rem;
        text-align: center;

        &:hover {
          background: var(--primary-50);
          transform: scale(1.02);
          cursor: pointer;
        }

        &:active {
          transform: scale(0.98);
        }

        &.disabled {
          opacity: 0.5;
          cursor: not-allowed;

          &:hover {
            background: var(--orange-500);
            transform: none;
          }
        }
      }

      .delete-btn {
        flex: 1;
        background: var(--primary-100);
        color: white;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: none;
        transition: all 0.2s;
        font-size: 1rem;

        &:hover {
          background: var(--primary-50);
          transform: scale(1.02);
          cursor: pointer;
        }

        &:active {
          transform: scale(0.98);
        }

        &.disabled {
          opacity: 0.5;
          cursor: not-allowed;

          &:hover {
            background: var(--orange-500);
            transform: none;
          }
        }
      }
      .edicao-bloqueada {
        background-color: #fff3cd;
        color: #856404;
        padding: 0.75rem 1.25rem;
        border-radius: 0.25rem;
        margin-bottom: 1rem;
        border: 1px solid #ffeeba;
      }
    }

    .avaliar-container {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

      select,
      textarea {
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

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;

      button {
        flex: 1;
        padding: 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .submit-btn {
        background-color: #ff6f00;
        color: white;
        border: none;

        &:hover {
          background-color: #ff6f00;
        }
      }

      .cancel-btn {
        background-color: white;
        color: #ff6f00;
        border: 1px solid #e2e8f0;

        &:hover {
          background-color: #f8fafc;
        }
      }
    }

    .avaliacoes-list {
      margin-top: 2rem;
    }

    .avaliacao-item {
      padding: 1.5rem;
      margin-bottom: 1rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .avaliacao-header {
      display: flex;
      align-items: center;
      margin-bottom: 0.75rem;

      h4 {
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--grey-900);
        margin: 0;
        margin-right: 1rem;
      }

      .rating {
        color: var(--grey-900);
        font-weight: 600;
        margin-right: auto;
      }
    }

    .avaliacao-actions {
      display: flex;
      gap: 0.5rem;

      button {
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: all 0.2s;
      }

      .edit-btn {
        background-color: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;

        &:hover {
          background-color: #dcfce7;
        }
      }

      .delete-btn {
        background-color: #fef2f2;
        color: #991b1b;
        border: 1px solid #fecaca;

        &:hover {
          background-color: #fee2e2;
        }
      }
    }

    .comentario {
      font-size: 0.875rem;
      color: #334155;
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }

    .avaliacao-date {
      font-size: 0.75rem;
      color: #64748b;
    }

    .no-avaliacoes,
    .avaliacoes-disabled {
      text-align: center;
      padding: 1.5rem;
      color: #64748b;
      background: #f8fafc;
      border-radius: 0.5rem;
      border: 1px dashed #e2e8f0;
    }

    @media (max-width: 768px) {
      .button-group {
        flex-direction: column;

        button {
          width: 100%;
        }
      }

      .avaliacao-header {
        flex-wrap: wrap;

        h4 {
          width: 100%;
          margin-bottom: 0.5rem;
        }
      }

      .avaliacao-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  }

  @media (max-width: 768px) {
    .content-container {
      grid-template-columns: 1fr;
      padding: 1rem;
    }

    .image-section .image-container img {
      height: 300px;
    }

    .info-section {
      h1 {
        font-size: 1.25rem;
      }

      .checkbox-list,
      .tasks-list {
        gap: 0.5rem;
      }

      .button-group {
        flex-direction: column;

        .back-btn,
        .submit-btn {
          width: 100%;
        }
      }
    }
  }
`;

export default Wrapper; 