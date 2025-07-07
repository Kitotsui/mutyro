import styled from "styled-components";

const Wrapper = styled.div`
  .mutiroes-container {
    h2 {
      font-size: 1.5rem;
      color: var(--text-color);
      margin-bottom: 2rem;
    }
  }

  .mutiroes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .mutirao-card {
    background: var(--white);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    text-decoration: none;
    color: var(--text-color);

    &:hover {
      box-shadow: var(--shadow-3);
      transform: translateY(-2px);
    }

    &.finalizado {
      background: var(--grey-200);
      opacity: 0.8;
      //pointer-events: none;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .mutirao-info {
      padding: 1.5rem;

      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      .date {
        font-size: 0.9rem;
        color: var(--grey-600);
        margin-bottom: 1rem;
      }

      .description {
        font-size: 0.9rem;
        color: var(--text-color);
        line-height: 1.6;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .author {
        font-size: 0.9rem;
        color: var(--grey-600);
      }
    }
  }

  @media (max-width: 768px) {
    .mutiroes-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default Wrapper;
