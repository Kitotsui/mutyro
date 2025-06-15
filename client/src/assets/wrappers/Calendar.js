import styled from "styled-components";

const Wrapper = styled.div`
  .calendar-wrapper {
    background-color: var(--light-color);
    border-radius: 8px;

    width: 400px;
    height: 400px;
    flex-shrink: 0;

    .react-calendar {
      width: 100%;
      height: 100%;
      border: none;
      display: flex;
      flex-direction: column;
      background: transparent;
      font-family: inherit;
    }

    /* .react-calendar__navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      button {
        background: none;
        border: none;
        font-size: 1rem;
        font-weight: bold;
        color: var(--dark-color);
        cursor: pointer;
      }
    } */

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
      grid-template-columns: repeat(7, 1fr); /* Ensure 7 even columns */
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
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-auto-rows: 1fr;
      min-height: 240px;
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
        opacity: 0.6;
      }

      &.react-calendar__tile--now {
        font-weight: bolder;
      }

      &.react-calendar__tile:hover {
        background-color: var(--grey-100);
      }

      &.react-calendar__tile--active {
        background-color: var(--grey-200);
        /* font-weight: bold; */
        position: relative;

        /* abbr::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 2rem;
          height: 2rem;
          background: var(--primary-color);
          border-radius: 50%;
          z-index: -1;
        } */
      }

      abbr {
        position: relative;
        z-index: 1;
      }
    }
    .day-with-event {
      /* background-color: var(--grey-200); */
      color: var(--light-color);
      /* font-weight: bold; */
      position: relative;

      abbr::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2rem;
        height: 2rem;
        background: var(--primary-color);
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        z-index: -1;
      }
    }
  }
`;

export default Wrapper;
