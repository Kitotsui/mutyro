import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Wrapper from "../assets/wrappers/Calendar";

interface CalendarProps {
  onChange?: (date: Date) => void;
  value?: Date;
}

const CustomCalendar = ({ onChange, value }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(value || new Date());

  const handleDateChange = (value: unknown) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      onChange?.(value);
    }
  };

  return (
    <Wrapper>
      <div className="calendar-wrapper">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          showNeighboringMonth={true}
          next2Label={null}
          prev2Label={null}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: "narrow" })
          }
        />
      </div>
    </Wrapper>
  );
};

export default CustomCalendar;
