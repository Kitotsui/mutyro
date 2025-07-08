import logo from "../assets/images/mutyroinnerlogo.png";
import Wrapper from "../assets/wrappers/Footer";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Wrapper>
      <footer className="footer">
        <div className="container footer-flex">
          <div className="footer-left">
            <img src={logo} alt="Mutyro logo" />
          </div>
          <ul className="footer-links">
            <li>
              <a href="/">{t('navbar.home')}</a>
            </li>
            <li>
              <a href="#">{t('footer.termos')}</a>
            </li>
            <li>
              <a href="#">{t('footer.privacidade')}</a>
            </li>
            <li>
              <a href="mailto:">{t('footer.contato')}</a>
            </li>
          </ul>
        </div>
        <p className="footer-copy">
          &copy; {currentYear} Mutyro. {t('geral.todosDireitosReservados')}
        </p>
      </footer>
    </Wrapper>
  );
};

export default Footer;
