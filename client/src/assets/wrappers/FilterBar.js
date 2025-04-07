import styled from "styled-components";

const Wrapper = styled.div`
  .filter-nav-btn {
    width: 50px;
    height: 50px;
    background: #ff9c39;
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.3s ease;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }

  .filter-nav-btn:hover {
    background: var(--primary-color);
  }

  .filter-nav-btn i {
    pointer-events: none;
  }

  span {
    font-weight: 700;
    color: #ff9c39;
    line-height: 2rem;
  }

  ul {
    justify-content: space-evenly;
    display: grid;
    grid-auto-flow: column;
    gap: 5rem;
    align-items: center;
    overflow: hidden;
  }

  li {
    position: relative;
    text-align: center;
    padding-bottom: 10px;
  }

  @media (max-width: 950px) {
    ul {
      gap: 2rem;
    }

    li:nth-child(n + 7):not(:last-child) {
      display: none;
    }
  }

  @media (max-width: 767px) {
    li:nth-child(n + 5):not(:last-child) {
      display: none;
    }
  }
`;

export default Wrapper;
