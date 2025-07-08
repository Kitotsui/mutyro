import styled from "styled-components";

const Wrapper = styled.div`
  .sidebar {
  }

  .hint-date {
    font-size: 12px;
    color: var(--primary-color);
  }

  .hint-title {
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .calendar-popup {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.5rem;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 200px; /* or fixed like 240px */
  }

  .calendar-popup {
    transition: opacity 0.2s ease;
    animation: fadeIn 0.2s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .calendar-wrapper {
    /* background-color: var(--light-color); */
    border-radius: 8px;
    flex-shrink: 0;
    padding: 0 1rem;

    .react-calendar {
      width: 100%;
      height: 100%;
      border: none;
      display: flex;
      flex-direction: column;
      background: transparent;
      font-family: inherit;
    }

    .react-calendar__navigation button {
      font-size: 1rem;
      color: rgba(0, 0, 0, 0.2);
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0 0.25rem;
    }

    .react-calendar__navigation button:hover {
      color: var(--primary-color);
    }

    .react-calendar__month-view__weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      text-transform: uppercase;
      font-size: 0.75rem;
      color: var(--grey-500);
      padding-bottom: 0.5rem;
    }

    .react-calendar__month-view__weekdays__weekday {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 0.25rem 0;
    }

    .react-calendar__month-view__days {
      display: grid !important;
      grid-template-columns: repeat(7, 1fr) !important;
      grid-auto-rows: 1fr !important;
      height: 300px !important;
    }
    .react-calendar__month-view__days__day {
    }

    .react-calendar__tile {
      background: none;
      border: none;
      padding: 0.5rem 0;
      text-align: center;
      cursor: pointer;
      font-size: 0.9rem;
      color: var(--dark-color);
      position: relative;
      border-radius: 6px;

      &:hover {
        background-color: var(--primary-color-light);
      }

      &.react-calendar__tile--neighboringMonth {
        color: #bbb;
        opacity: 0.2;
      }

      &.react-calendar__tile--now {
        font-weight: bolder;
      }

      &.react-calendar__tile:hover {
        background-color: var(--grey-100);
      }

      &.react-calendar__tile--active {
        background-color: var(--grey-200);
        position: relative;
      }

      abbr {
        position: relative;
        z-index: 1;
      }
    }

    .day-with-event {
      color: var(--light-color);
      position: relative;

      abbr::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2rem;
        height: 2rem;
        //background: var(--primary-50);
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        z-index: -1;
      }
    }
  }

  /* Destaca o dia com mutirão */
  .react-calendar__tile.day-with-event,
  .react-calendar__tile--now.day-with-event,
  .react-calendar__tile--active.day-with-event {
    background: var(--primary-50) !important;
    color: #fff !important;
    border-radius: 50% !important;
    font-weight: bold;
    position: relative;
  }

  /* Remover a bolinha branca extra */
  .react-calendar__tile.day-with-event::after,
  .react-calendar__tile--now.day-with-event::after,
  .react-calendar__tile--active.day-with-event::after {
    display: none !important;
  }

  /* Estilo do popup do calendário */
  .calendar-popup {
    background: #fff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    border-radius: 8px;
    padding: 1rem 1.2rem;
    min-width: 220px;
    max-width: 320px;
    z-index: 9999;
    font-size: 15px;
    color: #222;
    position: absolute !important;
  }

  .calendar-popup .hint-date {
    font-weight: bold;
    color: #ff9800;
    margin-bottom: 0.5rem;
    display: block;
  }

  .calendar-popup .hint-title {
    margin: 0.3rem 0;
    font-size: 15px;
    color: #333;
  }
`;

export default Wrapper;
