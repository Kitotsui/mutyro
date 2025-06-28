import styled from "styled-components";

const Wrapper = styled.div`
  background: var(--background-color);
  //min-height: 100vh;
  font-family: "Open Sans", sans-serif;

  .main-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem 3rem 1rem;
  }

  .mutirao-card {
    background: var(--white);
    border-radius: 2rem;
    box-shadow: var(--shadow-3);
    overflow: hidden;
    margin-bottom: 2rem;
  }

  .mutirao-header {
    background: var(--primary-100);
    position: relative;
    min-height: 220px;
    display: flex;
    align-items: center;
    padding: 2rem 2.5rem;
    color: var(--grey-50);
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: var(--bg-url);
      background-size: auto;
      background-position: center;
      opacity: 0.15;
      z-index: 1;
      pointer-events: none;
    }
    .header-content {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .mutirao-img {
      width: 120px;
      height: 120px;
      border-radius: 1.5rem;
      object-fit: cover;
      box-shadow: var(--shadow-2);
      border: 4px solid var(--white);
      background: var(--grey-100);
    }
    .org-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .org-label {
        background: rgba(255, 255, 255, 0.18);
        padding: 0.25rem 1rem;
        border-radius: 999px;
        font-size: 0.95rem;
        font-weight: 500;
        display: inline-block;
        margin-bottom: 0.3rem;
      }
      .org-name {
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--white);
        margin-bottom: 0.2rem;
      }
      .org-extra {
        font-size: 1rem;
        color: var(--grey-50);
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }

  .mutirao-content {
    padding: 2.5rem 2.5rem 2rem 2.5rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2.5rem;
    background: var(--white);
    border-radius: 0 0 2rem 2rem;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 2rem 1rem 1.5rem 1rem;
    }
  }

  .mutirao-main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .mutirao-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.2rem;
    flex-wrap: wrap;
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--primary-900);
      margin: 0;
    }
    .badges {
      display: flex;
      gap: 0.7rem;
      align-items: center;
      .badge {
        padding: 0.3rem 1rem;
        border-radius: 999px;
        font-size: 0.95rem;
        font-weight: 600;
        &.ativo {
          background: var(--green-light);
          color: var(--green-dark);
        }
        &.restante {
          background: var(--primary-100);
          color: var(--primary-900);
        }
      }
    }
  }

  .mutirao-info-row {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
    .info-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--grey-600);
      font-size: 1rem;
      svg,
      i {
        color: var(--primary-400);
        font-size: 1.2rem;
      }
    }

    .back-btn {
      background: none; /* Remove o fundo do botão */
      border: none; /* Remove a borda do botão */
      color: var(--primary-400); /* Define a cor padrão */
      font-size: 1rem; /* Ajusta o tamanho da fonte */
      font-weight: 600; /* Torna o texto mais destacado */
      cursor: default; /* Cursor padrão para usuários sem permissão */
      padding: 0; /* Remove o padding interno */
      transition: color 0.2s ease;
    }

    .back-btn.clickable {
      cursor: pointer; /* Cursor de clique para usuários com permissão */
    }

    .back-btn.clickable:hover {
      text-decoration: underline; /* Opcional: adiciona sublinhado no hover */
    }
  }

  .share-row {
    margin-bottom: 2rem;
  }

  .card-section {
    background: var(--grey-50);
    border-radius: 1.2rem;
    padding: 1.5rem 1.5rem 1.2rem 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-1);
    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--primary-900);
      margin-bottom: 0.7rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    p,
    ul,
    .section-description {
      color: var(--grey-700);
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    .section-description {
      font-size: 0.95rem;
      color: var(--grey-500);
      margin-bottom: 0.7rem;
    }
    ul {
      padding-left: 1.2rem;
      margin-bottom: 0.5rem;
    }
    .task-list,
    .checkbox-list {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }
    .task-item,
    .checkbox-item {
      background: var(--white);
      border: 1px solid var(--grey-200);
      border-radius: 0.7rem;
      padding: 0.7rem 1rem;
      font-size: 1rem;
      color: var(--grey-800);
      display: flex;
      align-items: center;
      gap: 0.7rem;
      transition: box-shadow 0.2s;
      &:hover {
        box-shadow: var(--shadow-3);
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
    .checkbox {
      margin-right: 20px;
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

  .mutirao-side {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .side-card {
    background: var(--grey-50);
    border-radius: 1.2rem;
    padding: 1.5rem 1.2rem 1.2rem 1.2rem;
    box-shadow: var(--shadow-1);
    margin-bottom: 1rem;
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--primary-900);
      margin-bottom: 0.7rem;
    }
    .side-progress {
      margin-bottom: 1.2rem;
      .progress-label {
        display: flex;
        justify-content: space-between;
        font-size: 0.95rem;
        color: var(--primary-900);
        margin-bottom: 0.2rem;
      }
      .progress-bar-bg {
        background: var(--grey-200);
        border-radius: 999px;
        height: 10px;
        width: 100%;
        overflow: hidden;
      }
      .progress-bar {
        background: var(--primary-100);
        height: 10px;
        border-radius: 999px;
        transition: width 0.5s;
      }
    }
    .side-termo {
      background: var(--grey-100);
      border-radius: 0.7rem;
      padding: 1rem;
      font-size: 0.95rem;
      color: var(--grey-700);
      margin-bottom: 1rem;
      max-height: 120px;
      overflow-y: auto;
    }
    .side-checkbox {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      margin-bottom: 1rem;
      input[type="checkbox"] {
        width: 1.1rem;
        height: 1.1rem;
        accent-color: var(--grey-300);
      }
      span {
        font-size: 0.95rem;
        color: var(--grey-700);
      }
    }
    .side-btns {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      button {
        width: 100%;
        border-radius: 1.2rem;
        font-size: 1.05rem;
        font-weight: 600;
        padding: 0.9rem 0;
        border: none;
        background: var(--primary-50);
        color: var(--white);
        box-shadow: var(--shadow-1);
        transition: background 0.2s, box-shadow 0.2s;
        cursor: pointer;
        &:hover {
          background: var(--primary-100);
          box-shadow: var(--shadow-2);
        }
        &.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
      .back-btn {
        background: var(--grey-200);
        color: var(--primary-900);
        font-weight: 500;
        &:hover {
          background: var(--grey-300);
        }
      }
    }
    .side-dica {
      background: var(--primary-50);
      border: 1px solid var(--primary-100);
      border-radius: 0.7rem;
      padding: 1rem;
      color: var(--primary-900);
      font-size: 0.95rem;
      margin-top: 1rem;
      display: flex;
      align-items: flex-start;
      gap: 0.7rem;
      .dica-icon {
        color: var(--primary-400);
        font-size: 1.3rem;
        margin-top: 0.1rem;
      }
      .dica-content {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        h4 {
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        p {
          font-size: 0.95rem;
        }
      }
    }
    .submit-btn {
      width: 100%;
      background: var(--primary-100);
      color: var(--white);
      border: none;
      border-radius: 1.2rem;
      font-size: 1.05rem;
      font-weight: 600;
      padding: 0.9rem 0;
      margin-bottom: 0.7rem;
      box-shadow: var(--shadow-1);
      transition: background 0.2s, box-shadow 0.2s;
      cursor: pointer;
      letter-spacing: 1px;
    }
    .submit-btn:hover {
      background: var(--primary-300);
      box-shadow: var(--shadow-3);
    }
    .back-btn {
      width: 100%;
      background: var(--grey-200);
      color: var(--primary-900);
      border: none;
      border-radius: 1.2rem;
      font-size: 1.05rem;
      font-weight: 500;
      padding: 0.9rem 0;
      box-shadow: var(--shadow-1);
      transition: background 0.2s, box-shadow 0.2s;
      cursor: pointer;
      letter-spacing: 1px;
    }
    .back-btn:hover {
      background: var(--grey-300);
      box-shadow: var(--shadow-2);
    }
  }

  @media (max-width: 900px) {
    .mutirao-content {
      grid-template-columns: 1fr;
      padding: 1.2rem 0.2rem 1.2rem 0.2rem;
    }
    .main-container {
      padding: 1rem 0.2rem 2rem 0.2rem;
    }
  }
`;

export default Wrapper;
