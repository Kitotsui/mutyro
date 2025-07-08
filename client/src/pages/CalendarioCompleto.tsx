import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  useLoaderData,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { SearchBar, Card } from "../components";
import Wrapper from "../assets/wrappers/CalendarioCompleto";

import { Calendar as BigCalendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format } from "date-fns";
import { parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";

import getImageUrl from "../utils/imageUrlHelper";

interface Mutirao {
  _id: string;
  imagemCapa: string;
  titulo: string;
  data: string;
  horario?: string;
  criadoPor: { nome?: string };
}

// Configuração do date-fns para o react-big-calendar
const locales = {
  "pt-BR": ptBR,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "";

  try {
    const { data } = await customFetch.get("/mutiroes/todos", {
      params: { search: searchTerm },
    });
    return { mutiroes: data.mutiroes, searchTerm };
  } catch (error) {
    console.error(error);
    return { mutiroes: [], searchTerm };
  }
};

const CalendarioCompleto = () => {
  const { t } = useTranslation();
  const { mutiroes, searchTerm } = useLoaderData() as {
    mutiroes: Mutirao[];
    searchTerm: string;
  };

  const navigate = useNavigate();

  const location = useLocation();
  const initialViewMode = location.state?.initialView || "agenda";
  const [viewMode, setViewMode] = useState<"agenda" | "month" | "grid">(
    initialViewMode
  );

  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<View>("month");

  const handleSearch = (query: string) => {
    if (query) {
      navigate(`/mutiroes?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/mutiroes");
    }
  };

  const eventsForBigCalendar = useMemo(
    () =>
      mutiroes.map((mutirao) => {
        // Se não houver horário, usa um padrão.
        const startDateTime = new Date(
          `${mutirao.data}T${mutirao.horario || "09:00:00"}`
        );
        const endDateTime = new Date(
          startDateTime.getTime() + 2 * 60 * 60 * 1000
        );

        return {
          title: mutirao.titulo,
          start: startDateTime,
          end: endDateTime,
          resource: { _id: mutirao._id },
        };
      }),
    [mutiroes]
  );

  const eventsForAgenda = useMemo(() => {
    if (!mutiroes) return [];

    let filteredMutiroes = [...mutiroes];

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliza para meia-noite

    const mostrarApenasFuturos = false;
    const MAX_DAYS_AHEAD = 180; // Infinity para todos

    if (mostrarApenasFuturos || Number.isFinite(MAX_DAYS_AHEAD)) {
      const limitDate = new Date(today);
      limitDate.setDate(today.getDate() + MAX_DAYS_AHEAD);

      filteredMutiroes = filteredMutiroes.filter((m) => {
        const eventDate = new Date(`${m.data}T${m.horario || "09:00"}`);
        return (
          (!mostrarApenasFuturos || eventDate >= today) &&
          (Number.isFinite(MAX_DAYS_AHEAD) ? eventDate <= limitDate : true)
        );
      });
    }

    const grouped = new Map<string, Mutirao[]>();

    const sortedMutiroes = [...filteredMutiroes].sort((a, b) => {
      const timeA = a.horario || "00:00";
      const timeB = b.horario || "00:00";
      return (
        new Date(`${a.data}T${timeA}`).getTime() -
        new Date(`${b.data}T${timeB}`).getTime()
      );
    });

    sortedMutiroes.forEach((mutirao) => {
      const dateKey = mutirao.data;
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)?.push(mutirao);
    });

    return Array.from(grouped.entries()).sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );
  }, [mutiroes]);

  const handleCalendarNavigate = (newDate: Date) => {
    setCalendarDate(newDate);
  };

  const formatAgendaDate = (dateString: string) => {
    const dateObj = new Date(dateString + "T00:00:00");
    return dateObj.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCalendarView = (newView: View) => {
    setCalendarView(newView);
  };

  const handleSelectEvent = (event: { resource: { _id: string } }) => {
    navigate(`/mutirao/${event.resource._id}`);
  };

  return (
    <Wrapper>
      <h2 className="page-title">{t('calendario.titulo')}</h2>
      <SearchBar onSearch={handleSearch} initialQuery={searchTerm} />

      <div className="view-toggle">
        <button
          onClick={() => setViewMode("agenda")}
          className={viewMode === "agenda" ? "active" : ""}
        >
          {t('calendario.agenda')}
        </button>
        <button
          onClick={() => setViewMode("month")}
          className={viewMode === "month" ? "active" : ""}
        >
          {t('calendario.calendario')}
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={viewMode === "grid" ? "active" : ""}
        >
          {t('calendario.grade')}
        </button>
      </div>

      <div className="content-area">
        {viewMode === "grid" && (
          <>
            <div className="mutiroes-header">
              {searchTerm
                ? t('calendario.resultadosPara', { searchTerm })
                : t('calendario.todosMutiroes')}
            </div>
            {mutiroes.length === 0 ? (
              <p className="no-results">{t('calendario.nenhumMutirao')}</p>
            ) : (
              <div className="mutiroes-list">
                {mutiroes.map((mutirao) => (
                  <Card
                    key={mutirao._id}
                    id={mutirao._id}
                    image={getImageUrl(mutirao.imagemCapa)}
                    title={mutirao.titulo}
                    date={mutirao.data}
                    user={mutirao.criadoPor?.nome || t('calendario.usuarioDesconhecido')}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {viewMode === "agenda" && (
          <div className="agenda-view">
            {mutiroes.length === 0 && (
              <p className="no-results">{t('calendario.nenhumMutirao')}</p>
            )}
            {eventsForAgenda.map(([date, eventsOnDate]) => (
              <div key={date} className="agenda-day-group">
                <h3>{formatAgendaDate(date)}</h3>
                <div className="agenda-events-list">
                  {eventsOnDate.map((event) => (
                    <Link
                      to={`/mutirao/${event._id}`}
                      key={event._id}
                      className="agenda-event"
                    >
                      <span className="agenda-event-time">
                        {event.horario || t('calendario.diaTodo')}
                      </span>
                      <div className="agenda-event-details">
                        <span className="agenda-event-title">
                          {event.titulo}
                        </span>
                        <span className="agenda-event-creator">
                          {/* por {event.criadoPor?.nome} */}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "month" && (
          <div className="calendar-container">
            <BigCalendar
              localizer={localizer}
              events={eventsForBigCalendar}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 650 }}
              culture="pt-BR"
              onSelectEvent={handleSelectEvent}
              date={calendarDate}
              onNavigate={handleCalendarNavigate}
              onView={handleCalendarView}
              view={calendarView}
              messages={{
                allDay: t('calendario.diaInteiro'),
                previous: t('calendario.anterior'),
                next: t('calendario.proximo'),
                today: t('calendario.hoje'),
                month: t('calendario.mes'),
                week: t('calendario.semana'),
                day: t('calendario.dia'),
                agenda: t('calendario.agenda'),
                date: t('calendario.data'),
                time: t('calendario.hora'),
                event: t('calendario.evento'),
                noEventsInRange: t('calendario.semEventos'),
              }}
              views={["month"]}
              // views={["month", "week", "day", "agenda"]}
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CalendarioCompleto;
