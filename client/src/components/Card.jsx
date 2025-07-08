import Wrapper from "../assets/wrappers/Card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";

import getImageUrl from "@/utils/imageUrlHelper";

const Card = ({ id, image, title, date, user, wasDraggingRef, finalizado }) => {
  const { t, i18n } = useTranslation();
  
  const getLocale = () => {
    switch (i18n.language) {
      case 'en-US':
        return enUS;
      case 'es-ES':
        return es;
      default:
        return ptBR;
    }
  };

  const handleClickCapture = (e) => {
    if (wasDraggingRef?.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Wrapper className={`card ${finalizado ? "finalizado" : ""}`}>
      <Link
        className="link-card"
        to={`/mutirao/${id}`}
        onClickCapture={handleClickCapture}
      >
        <img src={getImageUrl(image)} alt={title} />
        <div className="card-content">
          <h4>{title}</h4>
          <time dateTime={date}>
            {format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: getLocale() })}
          </time>
          <p>
            {t('geral.por')} <span>{user}</span>
          </p>
        </div>
      </Link>
    </Wrapper>
  );
};
export default Card;
