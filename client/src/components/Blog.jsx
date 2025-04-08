import logo from "../assets/images/mutyroinnerlogotextless.png";
import Wrapper from "../assets/wrappers/Blog";

import { FilterBar, Carousel, Card } from "../components";
import mutiroesData from "../data/mutiroes";
import { useState, useEffect, useRef } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Blog = () => {
  const [mutiroes, setMutiroes] = useState([]);

  const wasDragging = useRef(false);

  const [date, setDate] = useState(new Date());

  const socialCards = [
    {
      label: "#Bem-Estar",
      text: "Ajudar faz bem pro outro e pra você.",
    },
    {
      label: "#Crescimento",
      text: "Você aprende e evolui",
    },
    {
      label: "#Conexão",
      text: "Conheça gente incrível",
    },
    {
      label: "#Propósito",
      text: "Faça suas horas valerem mais.",
    },
  ];

  useEffect(() => {
    setMutiroes(mutiroesData);
  }, []);

  return (
    <Wrapper>
      <FilterBar />
      {/* BLOG CARDS */}
      <div className="blog-heading">
        <img src={logo} alt="Blog Heading Logo" draggable={false} />
        <h2>Mutirões Ativos</h2>
      </div>
      <div className="carousel-container">
        <div className="carousel-label-wrapper">
          <span className="carousel-label">Novidades</span>
        </div>
        <Carousel>
          {mutiroes.map((mutirao) => {
            const { id, image, title, date, user } = mutirao;
            return (
              <Card
                key={id}
                id={id}
                image={image}
                title={title}
                date={date}
                user={user}
                wasDraggingRef={wasDragging}
              />
            );
          })}
        </Carousel>
      </div>

      {/* Próximos Mutirões */}
      <div className="next-events-wrapper">
        <div className="left-column">
          <h2>Próximos Mutirões</h2>
          <h5>Link para uma página</h5>
          <button>Calendário Completo</button>
        </div>

        <div className="calendar-column">
          <div className="calendar-wrapper">
            <Calendar
              onChange={setDate}
              value={date}
              showNeighboringMonth={true}
              next2Label={null}
              prev2Label={null}
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale, { weekday: "narrow" })
              }
            />
          </div>
        </div>

        <div className="right-column">
          <ul className="next-events-list">
            <li>
              <time dateTime="2024-05-12">
                {new Date("2024-05-12").toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <h3>Doação de Alimentos</h3>
            </li>
            <li>
              <time dateTime="2024-05-12">
                {new Date("2024-05-12").toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <h3>Doação de Alimentos</h3>
            </li>
            <li>
              <time dateTime="2024-05-12">
                {new Date("2024-05-12").toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <h3>Doação de Alimentos</h3>
            </li>
          </ul>
        </div>
      </div>

      {/* #Mutyro Cards */}
      <div className="social-wrapper">
        <svg
          className="wave wave-top"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,192L60,170.7C120,149,240,107,360,85.3C480,64,600,64,720,101.3C840,139,960,213,1080,224C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        <div className="social-content">
          <h2>#Mutyro</h2>
          <div className="card-row">
            {socialCards.map((card, index) => (
              <div key={index} className="social-card">
                <div className="card-label">
                  <h4>{card.label}</h4>
                </div>
                <div className="card-text">
                  <p>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <svg
          className="wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none" // Esta linha que corrigiu o problema da altura do SVG - garante que as proporções não sejam mantidas
        >
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,192L60,170.7C120,149,240,107,360,85.3C480,64,600,64,720,101.3C840,139,960,213,1080,224C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </Wrapper>
  );
};
export default Blog;
