import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importa o CSS do react-calendar

const CalendarSection = () => {
  const [date, setDate] = useState(new Date()); // Estado para controlar a data selecionada

  return (
    <div className="calendar-section">
      
      {/* Seção dos mutirões */}
      
      
      {/* Calendário */}
      <div className="calendar-column">
        <div className="calendar-wrapper">
          <Calendar
            onChange={setDate} // Atualiza a data selecionada
            value={date} // Exibe a data selecionada no calendário
            showNeighboringMonth={true} // Exibe os meses vizinhos
            next2Label={null} // Remove o botão de "Próximo mês"
            prev2Label={null} // Remove o botão de "Mês anterior"
            formatShortWeekday={(locale, date) =>
              date.toLocaleDateString(locale, { weekday: "narrow" })
            }
          />
        </div>
      </div>
      <div className="mutiroes">
        <p><strong>Seus próximos mutirões</strong></p>
        <p>Você não tem nenhum mutirão</p>
      </div>
    </div>
  );
};

export default CalendarSection;
