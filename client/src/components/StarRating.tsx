import { ReactElement } from "react";
import Wrapper from "../assets/wrappers/StarRating";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  const stars: ReactElement[] = [];

  const roundedRating = Math.round(rating * 2) / 2;

  for (let i = 1; i <= maxRating; i++) {
    if (i <= roundedRating) {
      stars.push(<i key={i} className="fas fa-star" aria-hidden="true"></i>);
    } else if (
      i === Math.ceil(roundedRating) &&
      !Number.isInteger(roundedRating)
    ) {
      stars.push(
        <i key={i} className="fas fa-star-half-alt" aria-hidden="true"></i>
      );
    } else {
      stars.push(<i key={i} className="far fa-star" aria-hidden="true"></i>);
    }
  }

  return (
    <Wrapper>
      <div
        className="star-rating"
        aria-label={`Avaliação: ${rating.toFixed(1)} de ${maxRating} estrelas.`}
      >
        {stars}
      </div>
    </Wrapper>
  );
};

export default StarRating;
