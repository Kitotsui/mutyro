import styled from "styled-components";

const Wrapper = styled.div`
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

    .map-container-visualizar {
      height: 300px;
      width: 100%;
      margin-top: 20px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #ddd;
      .leaflet-map {
        width: 100%;
        height: 100%;
      }
      .leaflet-popup {
        a {
          line-height: 2rem;
        }
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
