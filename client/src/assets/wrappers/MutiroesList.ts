import styled from 'styled-components';

const Wrapper = styled.div`
  .mutiroes-container {
    padding: 1rem;
    
    h2 {
      margin-bottom: 1.5rem;
      color: var(--grey-900);
      font-weight: 600;
    }
  }

  .mutiroes-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .mutirao-card {
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: var(--shadow-1);
    transition: all 0.3s;
    text-decoration: none;

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-2);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .mutirao-info {
      padding: 1rem;

      h3 {
        color: var(--grey-900);
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .date {
        color: var(--grey-600);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }

      .description {
        color: var(--grey-700);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .author {
        color: var(--grey-600);
        font-size: 0.875rem;
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