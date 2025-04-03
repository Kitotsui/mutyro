import Wrapper from "../assets/wrappers/LandingPage";
import { NavBar, Hero, Blog, Footer } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <div className="container">
        <NavBar />
        <Hero />
        <Blog />
        <Footer />
      </div>
    </Wrapper>
  );
};

export default Landing;
