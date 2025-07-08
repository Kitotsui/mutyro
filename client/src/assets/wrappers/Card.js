import styled from "styled-components";
import { es } from 'date-fns/locale';

const Wrapper = styled.article`
  user-select: none;

  flex: 0 0 auto;
  scroll-snap-align: start;
  overflow: hidden;

  padding: 20px 24px;
  background-color: white;
  font-weight: 600;
  border-radius: 24px;
  width: 400px;
  height: fit-content;
  position: relative;
  transition: all 0.3s ease;

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

  /* Estilo para mutirões finalizados */
  &.finalizado {
    background-color: #f1f3f5;
    border: 1px solid #e9ecef;
    &::after {
      content: "FINALIZADO";
      position: absolute;
      top: 15px;
      right: 15px;
      background-color: #495057;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    img {
      filter: grayscale(30%) brightness(0.95);
    }
    h4,
    p,
    time {
      color: #868e96;
    }
    .card-content {
      opacity: 0.9;
    }
  }
`;

export default Wrapper;
