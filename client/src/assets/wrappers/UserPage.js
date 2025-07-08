import styled from "styled-components";

const Wrapper = styled.div`
  .min-h-screen {
    min-height: 100vh;
    background-color: #f8fafc;
  }

  main {
    max-width: 72rem;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2.5rem;
    width: 100%;

    @media (min-width: 768px) {
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }

  .profile-info {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    @media (min-width: 768px) {
      gap: 2.5rem;
    }
  }

  .profile-image {
    width: 7rem;
    height: 7rem;
    border-radius: 9999px;
    object-fit: cover;
    margin-right: 0.5rem;
    object-fit: cover;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--grey-300, #ddd);
  }

  .welcome-text {
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    p {
      color: #64748b;
    }
  }

  .new-mutirao-btn {
    background-color: var(--primary-100);
    color: white;
    padding: 0.5rem 1.5rem; /* menos padding horizontal para mobile */
    border-radius: 0.375rem;
    display: inline-flex; /* inline para não forçar largura total */
    justify-content: center;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    white-space: nowrap;
    max-width: 100%; /* evitar overflow */
    box-sizing: border-box;

    &:hover {
      background-color: var(--primary-50);
      color: var(--primary-300);
    }
  }

  .page-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1.1fr 2fr;
    gap: 1.5rem;
    align-items: flex-start;
    margin-top: 0.5rem;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-width: 320px;
    max-width: 350px;
  }

  .card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }

  .calendar-wrapper {
    .react-calendar {
      width: 100%;
      border: none;
      background: transparent;
      font-family: inherit;

      .react-calendar__navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        button {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.5rem;

          &:hover {
            color: var(--primary-50);
          }
        }
      }

      .react-calendar__month-view__weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        color: #64748b;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }

      .react-calendar__month-view__days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;

        button {
          aspect-ratio: 1;
          border: none;
          background: none;
          color: #1e293b;
          cursor: pointer;
          border-radius: 0.25rem;

          &:hover {
            background-color: #f1f5f9;
          }

          &.react-calendar__tile--now {
            background-color: #e2e8f0;
          }

          &.react-calendar__tile--active {
            background-color: var(--primary-100);
            color: white;
          }
        }
      }
    }
  }

  .next-mutiroes {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h2 {
        font-size: 1.125rem;
        font-weight: 600;
      }

      a {
        color: var(--primary-50);
        text-decoration: none;
        font-size: 0.875rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .mutirao-card {
      background-color: #f8fafc;
      padding: 1rem;
      border-radius: 0.375rem;

      h3 {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
      }

      p {
        color: #64748b;
        font-size: 0.875rem;
      }
    }
  }

  .interests {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h2 {
        font-size: 1.125rem;
        font-weight: 600;
      }

      button {
        color: var(--primary-100);
        background: none;
        border: none;
        font-size: 0.875rem;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      span {
        background-color: #e2e8f0;
        color: #1e293b;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
      }
    }
  }

  .mutiroes-list {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
      }

      .filters {
        display: flex;
        gap: 0.5rem;

        button {
          background: none;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          cursor: pointer;
          color: #64748b;

          &.active {
            background-color: var(--primary-100);
            color: white;
          }

          &:hover:not(.active) {
            background-color: #f1f5f9;
          }
        }
      }
    }

    .mutirao-item {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      margin-bottom: 1rem;
      display: flex;
      gap: 1rem;

      img {
        width: 8rem;
        height: 6rem;
        object-fit: cover;
        border-radius: 0.375rem;
      }

      .content {
        flex: 1;

        .date {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .description {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .author {
          color: #64748b;
          font-size: 0.875rem;
        }
      }
    }
  }

  @media (max-width: 900px) {
    .sidebar {
      min-width: auto;
      max-width: 100%;
      width: 100%;
    }
  }

  @media (max-width: 992px) {
    .profile-header {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
  @media (max-width: 768px) {
    .new-mutirao-btn {
      align-self: center;
    }
    .profile-info {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }
`;

export default Wrapper;
