import logo from "../assets/images/mutyroinnerlogotextless.png";
import Wrapper from "../assets/wrappers/Blog";

import { FilterBar, Carousel, Card } from ".";
import { useState, useEffect, useRef, useMemo } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Link } from "react-router-dom";
import { formatDate } from "react-calendar/dist/esm/shared/dateFormatter.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Mutirao {
  _id: string;
  imagemCapa: string;
  titulo: string;
  data: string;
  criadoPor?: { nome?: string };
}

interface BlogProps {
  mutiroes: Mutirao[];
}

const Blog = ({ mutiroes }: BlogProps) => {
  const wasDragging = useRef(false);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mutiroesOnSelectedDate, setMutiroesOnSelectedDate] = useState<
    Mutirao[]
  >([]);
  const eventDatesStrings = useMemo(() => {
    return new Set(mutiroes.map((mutirao) => mutirao.data));
  }, [mutiroes]);

  const tileClassName = ({
    date,
    view,
    activeStartDate,
  }: {
    date: Date;
    view: string;
    activeStartDate: Date;
  }) => {
    if (view !== "month") return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const classes: string[] = [];

    if (eventDatesStrings.has(dateString)) {
      classes.push("day-with-event");
    }

    // Check if tile date month is different from the displayed month (activeStartDate)
    if (
      date.getMonth() !== activeStartDate.getMonth() ||
      date.getFullYear() !== activeStartDate.getFullYear()
    ) {
      classes.push("react-calendar__tile--neighboringMonth");
    }

    return classes.length > 0 ? classes.join(" ") : null;
  };

  const handleDateChange = (value: any) => {
    // react-calendar onChange can return Date or Date[]
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setSelectedDate(value[0]);
    }
  };

  // Para filtrar os mutirões na coluna direita
  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const selectedDateString = `${year}-${month}-${day}`;

    console.log("Filtrando mutirões para a data: ", selectedDateString);

    const filtered = mutiroes.filter(
      (mutirao) => mutirao.data === selectedDateString
    );
    setMutiroesOnSelectedDate(filtered);
  }, [selectedDate, mutiroes]);

  // Memorizando a lista dos Próximos Mutirões
  const upcomingMutiroes = useMemo(() => {
    const todayStr = new Date().toISOString().split("T")[0];

    return mutiroes
      .filter((mutirao) => {
        return mutirao.data >= todayStr; // && (mutirao.mutiraoStatus === 'PENDENTE' || mutirao.mutiraoStatus === 'AGENDADO');
      })
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()) // Sort by date
      .slice(0, 3); // Quantidade de itens na lista
  }, [mutiroes]);

  const formatDisplayDate = (dateString: string) => {
    // YYYY-MM-DD
    const dateObj = new Date(dateString + "T00:00:00"); //  T00:00:00 para garantir
    return dateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      // year: "numeric",
    });
  };

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
            const { _id, imagemCapa, titulo, data, criadoPor } = mutirao;
            return (
              <Card
                key={_id}
                id={_id}
                image={"http://localhost:5100" + imagemCapa}
                title={titulo}
                date={data}
                user={criadoPor?.nome || "Usuário desconhecido"}
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
          <ul className="upcoming-events-list">
            {" "}
            {/* Changed to ul for semantics */}
            {upcomingMutiroes.map((mutirao) => (
              <li key={mutirao._id} className="upcoming-event-item">
                <Link
                  to={`/mutirao/${mutirao._id}`}
                  className="upcoming-event-link"
                >
                  <strong>{mutirao.titulo}</strong>
                  <span className="date-display">
                    <span className="date-day">
                      {format(new Date(mutirao.data), "dd")}
                    </span>
                    <span className="date-month">
                      {format(new Date(mutirao.data), "MMM", { locale: ptBR })}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Implementar página de calendário completo */}
          <button>Calendário Completo</button>
        </div>

        <div className="calendar-column">
          <div className="calendar-wrapper">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={tileClassName}
              showNeighboringMonth={true}
              next2Label={null}
              prev2Label={null}
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale || "pt-BR", {
                  weekday: "narrow",
                })
              }
              locale="pt-BR"
            />
          </div>
        </div>

        <div className="right-column">
          <ul className="next-events-list">
            {mutiroesOnSelectedDate.length > 0 ? (
              <>
                <li>
                  <time dateTime={mutiroesOnSelectedDate[0].data}>
                    {formatDisplayDate(mutiroesOnSelectedDate[0].data)}
                  </time>
                </li>

                {mutiroesOnSelectedDate.map((mutirao) => (
                  <li key={mutirao._id}>
                    <Link to={`/mutirao/${mutirao._id}`}>
                      <h3>{mutirao.titulo}</h3>
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <li>
                <p>Nenhum mutirão nesta data.</p>
              </li>
            )}
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
