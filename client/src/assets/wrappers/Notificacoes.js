import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;

  .notificacoes-main-container {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .notificacoes-sidebar {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 220px;
    max-width: 320px;
    height: fit-content;
  }

  .notificacoes-sidebar-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: none;
    border: none;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 1rem;
    color: #475569;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .notificacoes-sidebar-btn.ativo {
    background: #fff7ed;
    color: #ef561d;
    border-left: 4px solid #ef561d;
    font-weight: 600;
  }
  .notificacoes-sidebar-icon {
    font-size: 1.3rem;
    min-width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .notificacoes-sidebar-label {
    flex: 1;
    text-align: left;
  }
  .notificacoes-sidebar-count {
    background: #ef561d;
    color: #fff;
    font-size: 0.85rem;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    margin-left: auto;
    font-weight: 600;
  }

  .notificacoes-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .notificacoes-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 1rem;
  }
  .notificacoes-title {
    font-size: 2rem;
    font-weight: 700;
    color: #222;
    margin-bottom: 0.2rem;
  }
  .notificacoes-subtitle {
    color: #64748b;
    font-size: 1rem;
  }
  .notificacoes-header-actions {
    display: flex;
    gap: 1rem;
  }
  .notificacoes-btn-link {
    background: none;
    border: none;
    color: #64748b;
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #ef561d;
    }
  }
  .notificacoes-btn-orange {
    background: #ef561d;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    &:hover {
      background: #ff9100;
    }
  }
  .notificacoes-lista-cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .notificacoes-card {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    padding: 1.5rem 2rem;
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    border: 1.5px solid #fff;
    transition: box-shadow 0.2s, border 0.2s;
    position: relative;
  }
  .notificacoes-card.nao-lida {
    border: 1.5px solid #ef561d;
    background: #fff7ed;
  }
  .notificacoes-card.favorita {
    border: 1.5px solid #ffd700;
    background: #fffef7;
  }
  .notificacoes-card-icone {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff9100 0%, #ef561d 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    color: #fff;
    flex-shrink: 0;
  }
  .notificacoes-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .notificacoes-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.2rem;
  }
  .notificacoes-card-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: #222;
  }
  .notificacoes-card-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .notificacoes-card-data {
    font-size: 0.95rem;
    color: #64748b;
  }
  .notificacoes-card-dot {
    width: 10px;
    height: 10px;
    background: #ef561d;
    border-radius: 50%;
    margin-left: 0.3rem;
  }
  .notificacoes-card-msg {
    color: #475569;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .notificacoes-card-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .notificacoes-btn-fav {
    background: none;
    border: none;
    color: #ef561d;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #ff9100;
    }
  }
  .notificacoes-btn-fav.favoritada {
    color: #ffd700;
    &:hover {
      color: #ffed4e;
    }
  }
  .notificacoes-vazio {
    color: #64748b;
    text-align: center;
    padding: 2rem 0;
    font-size: 1.1rem;
  }

  .notificacoes-btn-delete {
    background: none;
    border: none;
    color: #ff4d4f;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .notificacoes-btn-delete:hover {
    background: rgba(255, 77, 79, 0.1);
  }

  .notificacoes-btn-delete svg {
    width: 16px;
    height: 16px;
  }
`;

export default Wrapper; 