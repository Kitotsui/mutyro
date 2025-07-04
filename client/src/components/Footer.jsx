import logo from "../assets/images/mutyroinnerlogo.png";
import Wrapper from "../assets/wrappers/Footer";

const Footer = () => {
  return (
    <Wrapper>
      <footer className="footer">
        <div className="container footer-flex">
          <div className="footer-left">
            <img src={logo} alt="Mutyro logo" />
          </div>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">Termos</a>
            </li>
            <li>
              <a href="#">Privacidade</a>
            </li>
            <li>
              <a href="mailto:">Contato</a>
            </li>
          </ul>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Mutyro. Todos os direitos
          reservados.
        </p>
      </footer>
    </Wrapper>
  );
};

export default Footer;
