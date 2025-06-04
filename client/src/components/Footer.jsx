import logo from "../assets/images/mutyroinnerlogo.png";
import Wrapper from "../assets/wrappers/Footer";

const Footer = () => {
  return (
    <Wrapper>
      <footer className="footer">
        <div className="container footer-flex">
          <ul className="footer-links">
            <li>
              <img src={logo} alt="" />
            </li>
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
          <p>
            &copy; {new Date().getFullYear()} Mutyro. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </Wrapper>
  );
};
export default Footer;
