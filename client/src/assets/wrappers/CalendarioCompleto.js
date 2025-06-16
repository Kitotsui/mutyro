import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-transform: unset;
    white-space: nowrap;
    width: 100%;
    margin-bottom: 2rem;
  }

  .calendar-wrapper {
    justify-self: center;
  }

  .mutiroes-header {
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-color);
    margin-bottom: 2rem;
    border-bottom: 2px solid var(--primary-100, #eee);
    padding-bottom: 1rem;
  }

  .card {
    border-radius: 16px;
    width: 100%;
    .img {
      width: 10px;
    }
  }

  .mutiroes-list {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .no-results {
    text-align: center;
    font-size: 1.2rem;
    color: var(--text-secondary-color);
    margin-top: 3rem;
  }

  .page-title {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    color: var(--text-color);
  }

  /* View Toggle Buttons */
  .view-toggle {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 2rem 0;

    button {
      background: transparent;
      border: 1px solid var(--grey-300, #ccc);
      padding: 0.5rem 1.5rem;
      border-radius: var(--border-radius, 8px);
      cursor: pointer;
      color: var(--text-secondary-color);
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        background: var(--grey-100, #f0f0f0);
        color: var(--primary-color);
        border-color: var(--grey-400, #bbb);
      }

      &.active {
        background: var(--primary-100, blue);
        color: var(--white);
        border-color: var(--primary-100, blue);
      }
    }
  }

  /* Agenda View */
  .agenda-view {
    margin-top: 1.5rem;
  }

  .agenda-day-group {
    margin-bottom: 2.5rem;

    h3 {
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--text-color);
      padding-bottom: 0.75rem;
      border-bottom: 2px solid var(--primary-100, #eee);
      margin-bottom: 1rem;
      text-transform: capitalize;
    }
  }

  .agenda-events-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .agenda-event {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-1);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    text-decoration: none;
    color: inherit;
    border-left: 5px solid var(--primary-300, lightblue);

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-3);
    }
  }

  .agenda-event-time {
    font-weight: 600;
    color: var(--primary-color, blue);
    margin-right: 1.5rem;
    font-size: 0.9rem;
    min-width: 70px;
    text-align: center;
  }

  .agenda-event-details {
    display: flex;
    flex-direction: column;
  }

  .agenda-event-title {
    font-weight: 500;
    font-size: 1.1rem;
    color: var(--text-color);
  }

  /* Calendar Container (React Big Calendar) */
  .calendar-container {
    background: var(--white);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
  }

  /* Toolbar Buttons */
  .rbc-toolbar button {
    color: var(--grey-500);
    border: 1px solid var(--grey-300);
    background-color: var(--white);

    &:hover,
    &:focus {
      background-color: var(--grey-100);
      color: var(--primary-color);
    }

    &.rbc-active {
      background-color: var(--primary-100);
      color: white;
      border-color: var(--primary-50);
    }
  }

  .rbc-toolbar-label {
    /* padding: 1rem; */
    margin: 15px;
    color: var(--grey-400);
  }

  .rbc-event {
    background-color: var(--primary-color, lightblue);
    border: none;
    border-radius: 4px;
    padding: 2px 4px;

    &:hover,
    &:focus {
      background-color: var(--primary-100, blue);
    }
  }

  .rbc-header {
    border-bottom: 1px solid var(--grey-200);
    padding: 0.5rem 0;
    font-weight: 600;
    color: var(--text-secondary-color);
  }

  .rbc-today {
    opacity: 0.5;
    background-color: var(--grey-200);
  }

  .rbc-off-range {
    opacity: 0.6;
  }
`;

export default Wrapper;
