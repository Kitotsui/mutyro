import logo from "../images/mutyroinnerlogotextless.png";
import styled from "styled-components";

const Wrapper = styled.div`
  /* BLOG CARDS */
  .blog-heading {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 3rem 2rem;
  }

  .blog-heading img {
    max-height: 50px;
    width: auto;
  }
  .blog-heading h2 {
    font-size: 36px;
    font-weight: 500;
    color: var(--dark-color);
  }

  .carousel-container {
    padding: 0 2rem;
    display: flex;
    align-items: center;
    position: relative;
  }

  .carousel-label {
    position: absolute;
    transform: rotate(-90deg) translateY(-50%);
    transform-origin: left center;
    color: #c78752;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.1rem;
    white-space: nowrap;
  }

  .carousel-label-wrapper {
    position: relative;
    height: 100%;
  }

  .next-events-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 2rem;
    padding: 2rem;
    background-color: var(--light-bg); /* optional */

    .left-column,
    .calendar-column,
    .right-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
    }

    .left-column {
      text-align: center;
    }

    h2 {
      font-size: 32px;
      margin-bottom: 0.5rem;
      line-height: 2rem;
      font-weight: 700;
    }

    h3 {
      font-size: 24px;
      line-height: 2rem;
    }

    h5 {
      font-size: 12px;
    }

    h3,
    h5 {
      font-weight: 700;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    time {
      font-weight: 500;
      color: var(--primary-color);
    }

    .left-column button {
      padding: 0.8rem 1.2rem;
      font-weight: bold;
      background-color: var(--light-color);
      color: var(--dark-color);
      border: 1px solid var(--grey-400);
      border-radius: 12px;
      cursor: pointer;
    }

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

      .react-calendar__navigation {
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
      }

      .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-size: 0.75rem;
        color: var(--grey-500);
        padding-bottom: 0.5rem;
      }

      .react-calendar__month-view__days {
        background-color: white;
        border-radius: 16px;
        padding: 1rem;
        gap: 0.5rem;
        border: 1px solid var(--grey-200);
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
          font-weight: bold;
          color: var(--primary-color);
        }

        &.react-calendar__tile--active {
          background-color: var(--grey-200);
          color: var(--light-color);
          font-weight: bold;
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
            border-radius: 50%;
            z-index: -1;
          }
        }

        abbr {
          position: relative;
          z-index: 1;
        }
      }
    }

    .right-column p {
      font-size: 1rem;
      margin: 0.3rem 0;
    }
  }

  /* Social */
  .social-wrapper {
    background-color: #ef561d;
    position: relative;
    overflow: hidden;
    text-align: center;
  }

  .wave {
    width: 100%;
    height: 100px;
    display: block;
  }

  .wave-top {
    transform: rotate(180deg);
    margin-bottom: -1px;
  }

  .wave-bottom {
    margin-top: -1px;
  }

  .social-content {
    h2 {
      font-size: 4rem;
      color: var(--light-color);
    }
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
    padding: 2rem;
    padding-left: 3rem;
    width: 100%;
  }

  .card-row {
    display: flex;
    gap: 2rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 1rem;
  }

  .social-card {
    margin-left: 1rem;
    position: relative;
    background-color: #ff9100;
    width: 200px;
    height: 200px;
    border-radius: 12px;
    padding: 0;
    color: var(--light-color);
    font-weight: 500;
    overflow: visible;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .social-card p {
    width: 100%;
    height: 60px;
    margin: 0;
    padding: 1rem;
    display: flex;
    font-size: 1rem;
  }

  .card-label {
    position: absolute;
    top: -10px;
    left: -40px;
    background-color: #c78752;
    padding: 1rem 1rem;
    border-radius: 6px;
    color: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    z-index: 1;
    margin: 2rem;
  }

  .card-label h4 {
    margin: 0;
    font-size: 0.75rem;
  }
  @media (max-width: 940px) {
    .next-events-wrapper {
      align-items: center;
      flex-direction: column;
    }

    .card-row {
      flex-direction: column;
    }
  }
`;

export default Wrapper;
