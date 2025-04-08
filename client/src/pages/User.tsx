import Wrapper from "../assets/Wrappers/UserPage.js";
import { NavBar, Blog, Footer } from "../components";
import ProfileCard from "../components/ProfileCard";
import CalendarSection from "../components/CalendarSection";
import MutiroesList from "../components/MutiroesList";
import InterestsBox from "../components/InterestsBox";
import DashboardStats from "../components/DashboardStats";
import { useState } from "react";
import CadastroMutirao from "../components/CadastroMutirao"; // certifique-se do nome aqui

const User = () => {
  const [showCadastro, setShowCadastro] = useState(false);

  const toggleCadastro = () => {
    console.log("Clicou no botão");
    setShowCadastro(!showCadastro);
  };

  return (
    <Wrapper>
      <NavBar />
      <main className="main-content">
        <section className="left-panel">
          <ProfileCard />
          <CalendarSection />
          <InterestsBox />
        </section>
        <section className="right-panel">
          <div className="header">
            <h2>Seja Bem vindo</h2>
            <button className="btn" onClick={toggleCadastro}>
              + Novo Mutirão
            </button>
          </div>

          <MutiroesList />
          
        </section>
      </main>
      {showCadastro && <CadastroMutirao onClose={toggleCadastro} />}
      <Footer />
    </Wrapper>
  );
};

export default User;
