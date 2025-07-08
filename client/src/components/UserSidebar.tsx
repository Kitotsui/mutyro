import { Link } from "react-router-dom";


import React, { useMemo, useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useTranslation } from "react-i18next";
import Wrapper from '../assets/wrappers/UserSidebar';

interface UserSidebarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  interesses: string[];
  proximosMutiroes?: { titulo: string; data: string }[];
}

const UserSidebar = ({
  date,
  onDateChange,
  interesses,
  proximosMutiroes = [],
}: UserSidebarProps) => {
  const [popupDate, setPopupDate] = React.useState<Date | null>(null);
  const { t } = useTranslation();

  const eventDatesStrings = useMemo(() => {
    return new Set(proximosMutiroes.map((mutirao) => mutirao.data));
  }, [proximosMutiroes]);

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

    if (
      date.getMonth() !== activeStartDate.getMonth() ||
      date.getFullYear() !== activeStartDate.getFullYear()
    ) {
      classes.push("react-calendar__tile--neighboringMonth");
    }

    return classes.length > 0 ? classes.join(" ") : null;
  };

  const handleCalendarDateChange: React.ComponentProps<typeof Calendar>["onChange"] = (value) => {
    let newSelectedDate: Date | null = null;
    if (value instanceof Date) {
      newSelectedDate = value;
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      newSelectedDate = value[0];
    }

    if (newSelectedDate) {
      onDateChange(newSelectedDate);

      const year = newSelectedDate.getFullYear();
      const month = String(newSelectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(newSelectedDate.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      if (eventDatesStrings.has(dateString)) {
        setPopupDate(newSelectedDate);
      } else {
        setPopupDate(null);
      }
    }
  };

  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

  const handleTileClick = (value: Date, event: React.MouseEvent) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    setPopupDate(value);
    setPopupStyle({
      position: "fixed",
      top: rect.bottom + 8, // 8px below the tile
      left: rect.left,
      zIndex: 1000,
    });
  };

  const popupRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setPopupDate(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <div className="sidebar">
        {/* Calendário */}
        <div className="card calendar-column">
          <div className="calendar-wrapper">
            <Calendar
              onChange={handleCalendarDateChange}
              value={date}
              tileClassName={tileClassName}
              showNeighboringMonth={true}
              showFixedNumberOfWeeks={false}
              onClickDay={handleTileClick}
              next2Label={null}
              prev2Label={null}
              formatShortWeekday={(locale, d) =>
                d.toLocaleDateString(locale || "pt-BR", { weekday: "narrow" })
              }
              locale="pt-BR"
            />
            {popupDate && (
              <div className="calendar-popup" style={popupStyle} ref={popupRef}>
                <strong className="hint-date">
                  {popupDate.toLocaleDateString("pt-BR", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </strong>
                <ul>
                  {proximosMutiroes
                    .filter(
                      (m) => m.data === popupDate.toISOString().split("T")[0]
                    )
                    .map((m, i) => (
                      <li className="hint-title" key={i}>
                        {m.titulo}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Próximos Mutirões */}
        <div className="card next-mutiroes">
          <div className="header">
            <h2>{t('mutiroes.titulo')}</h2>
            <Link to="/mutiroes">{t('mutiroes.verTodos')}</Link>
          </div>
          {proximosMutiroes.length === 0 ? (
            <div
              style={{
                color: "#64748b",
                fontSize: 14,
                padding: "1rem 0",
                textAlign: "center",
              }}
            >
              {t('mutiroes.semMutiroes')}
              <br />
              <span style={{ fontSize: 13 }}>
                {t('mutiroes.semMutiroesDesc')}
              </span>
            </div>
          ) : (
            proximosMutiroes.map((mutirao, idx) => (
              <div className="mutirao-card" key={idx}>
                <h3>{mutirao.titulo}</h3>
                <p>{mutirao.data}</p>
              </div>
            ))
          )}
        </div>

        {/* Interesses */}
        <div className="card interests">
          <div className="header">
            <h2>Seus Interesses</h2>
            <button>Ver todos</button>
          </div>
          <ul>
            {interesses.map((interesse, idx) => (
              <li key={idx}>{interesse}</li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserSidebar;
