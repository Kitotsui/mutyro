import styled from "styled-components";

const Wrapper = styled.div`
  .carousel {
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    white-space: nowrap;

    cursor: grab;
    user-select: none;
    -webkit-user-drag: none;

    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 1rem;
    scroll-behavior: smooth;
    /* transition: scroll-left 0.2s ease-in-out; */
    max-width: 100%;

    scrollbar-width: none; /* Hide scrollbar Firefox */
    -ms-overflow-style: none; /* Hide scrollbar Edge */
  }

  .carousel::-webkit-scrollbar {
    display: none; /* Hide scrollbar Chrome and Safari */
  }

  position: relative;
  overflow: hidden;

  &.hide-left::before,
  &.hide-right::after {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 60px;
    z-index: 1;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  &::before {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

export default Wrapper;
