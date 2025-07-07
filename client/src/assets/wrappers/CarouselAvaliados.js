import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 1rem 0;
  background-color: var(--background-color, #f9fafb);
  border-top: 1px solid var(--grey-100, #eee);
  border-bottom: 1px solid var(--grey-100, #eee);
  overflow: hidden;

  .loading-text {
    text-align: center;
    color: var(--text-secondary-color);
  }

  .story-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: clamp(280px, 35vw, 700px);
    height: 100px;
    padding: 1rem 1.5rem;
    margin: 0 0.75rem;
    flex-shrink: 0;
    border-radius: var(--border-radius);
    background-color: var(--white);
    overflow: hidden;
    box-shadow: var(--shadow-1);
    text-decoration: none;
    color: inherit;
    border-left: 2px solid var(--secondary-color);
    border-right: 2px solid var(--primary-200);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 100%;
      background-image: var(--bg-capa);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      mask-image: linear-gradient(to right, black 70%, transparent 100%);
      -webkit-mask-image: linear-gradient(
        to right,
        black 70%,
        transparent 100%
      );
      opacity: 0.5;
      z-index: 0;
      pointer-events: none;
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 60%;
      height: 100%;
      background-image: var(--bg-tipo);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      mask-image: linear-gradient(to left, black 70%, transparent 100%);
      -webkit-mask-image: linear-gradient(to left, black 70%, transparent 100%);
      opacity: 0.6;
      z-index: 0;
      pointer-events: none;
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }

    &:hover {
      transform: scale(1.05);
      transition: transform 0.3s ease-in-out, box-shadow 0.2s ease-in-out;
      border-bottom: 4px solid var(--primary-color);
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  .story-content {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    padding: 0.5rem 1rem;
    margin: 0 1rem;
    width: 85%;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border-left: 2px solid var(--primary-color);
    border-right: 2px solid var(--primary-color);
  }

  .story-comment {
    font-style: italic;
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--text-color);
    margin-bottom: 0.25rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    letter-spacing: 0.02em;
    margin: 0 0 0.5rem 0;
  }

  .story-author {
    font-weight: 600;
    font-size: 0.75rem;
    color: var(--text-secondary-color);
    opacity: 0.7;
    text-align: right;
    margin-top: auto;
    letter-spacing: 0.04em;
  }

  .story-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* margin-bottom: 0.5rem; */
  }

  .story-mutirao-title {
    font-weight: bold;
    font-size: 0.95rem;
    color: var(--text-color);
    /* Truncate long titles if necessary */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    .story-card {
      width: 260px;
      height: 180px;
      margin: 0.5rem;
      padding: 0.75rem;
    }

    .story-comment {
      font-size: 0.8rem;
    }

    .story-author {
      font-size: 0.7rem;
    }
  }
`;

export default Wrapper;
