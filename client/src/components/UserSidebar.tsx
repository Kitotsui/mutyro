import { Link } from "react-router-dom";
import CustomCalendar from "./Calendar";

interface UserSidebarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  interesses: string[];
}

const UserSidebar = ({ date, onDateChange, interesses }: UserSidebarProps) => {
  return (
    <div className="sidebar">
      {/* Calendário */}
      <div className="card calendar">
        <CustomCalendar onChange={onDateChange} value={date} />
      </div>

      {/* Próximos Mutirões */}
      <div className="card next-mutiroes">
        <div className="header">
          <h2>Seus próximos mutirões</h2>
          <Link to="/mutiroes">Ver todos</Link>
        </div>
        <div className="mutirao-card">
          <h3>Reforma da Biblioteca</h3>
          <p>Mar 28, 2024</p>
        </div>
      </div>

      {/* Interesses */}
      <div className="card interests">
        <div className="header">
          <h2>Seus Interesses</h2>
          <button>Ver todos</button>
        </div>
        <div className="tags">
          {interesses.map((interesse) => (
            <span key={interesse}>{interesse}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSidebar; 