import Wrapper from "../assets/wrappers/LandingPage";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <Wrapper>
      <div className="container">
        {/* info */}
        <NavBar />
        <Hero />
        <Footer />
      </div>
    </Wrapper>
  );
};

export default Landing;
