import Wrapper from "../assets/wrappers/FilterBar";
import { useTranslation } from "react-i18next";

const FilterBar = () => {
  const { t } = useTranslation();
  
  return (
    <Wrapper>
      <div>
        <ul>
          <li>
            <i className="fas fa-chevron-left"></i>
          </li>
          <li>
            <button className="filter-nav-btn">
              <i className="fas fa-heartbeat"></i>
            </button>
            <span>{t('novoMutirao.tipos.saude')}</span>
          </li>
          <li>|</li>
          <li>
            <button className="filter-nav-btn">
              <i className="fas fa-heartbeat"></i>
            </button>
            <span>{t('novoMutirao.tipos.saude')}</span>
          </li>
          <li>|</li>
          <li>
            <button className="filter-nav-btn">
              <i className="fas fa-heartbeat"></i>
            </button>
            <span>{t('novoMutirao.tipos.saude')}</span>
          </li>
          <li>|</li>
          <li>
            <button className="filter-nav-btn">
              <i className="fas fa-heartbeat"></i>
            </button>
            <span>{t('novoMutirao.tipos.saude')}</span>
          </li>
          <li>
            <i className="fas fa-chevron-right"></i>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};
export default FilterBar;
