import styled from "styled-components";

const Wrapper = styled.article`
  user-select: none;

  flex: 0 0 auto;
  scroll-snap-align: start;
  overflow: hidden;

  padding: 20px 24px;
  background-color: white;
  font-weight: 600;
  width: 400px;
  height: fit-content;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out, box-shadow 0.2s ease-in-out;
    border-bottom: 4px solid var(--primary-color);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }

  a {
    display: block;
    color: inherit;
    text-decoration: none;
    -webkit-user-drag: none;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }
  h4 {
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  img {
    user-select: none;
    -webkit-user-drag: none;
    width: 100%;
    height: 270px;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export default Wrapper;
