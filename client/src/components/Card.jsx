import Wrapper from "../assets/wrappers/Card";
import { Link } from "react-router-dom";

const Card = ({ id, image, title, date, user, wasDraggingRef }) => {
  const handleClickCapture = (e) => {
    if (wasDraggingRef?.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Wrapper className="card">
      <Link
        className="link-card"
        to={`/mutirao/${id}`}
        onClickCapture={handleClickCapture}
      >
        <img src={image} alt="Foto do Mutirão" />
        <div className="card-content">
          <h4>{title}</h4>
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </time>
          <p>
            por <span>{user}</span>
          </p>
        </div>
      </Link>
    </Wrapper>
  );
};
export default Card;
