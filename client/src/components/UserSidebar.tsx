import { Link } from "react-router-dom";
import CustomCalendar from "./Calendar";

interface UserSidebarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  interesses: string[];
  proximosMutiroes?: { titulo: string; data: string }[];
}

const UserSidebar = ({ date, onDateChange, interesses, proximosMutiroes = [] }: UserSidebarProps) => {
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
        {proximosMutiroes.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: 14, padding: '1rem 0', textAlign: 'center' }}>
            Você não tem nenhum mutirão<br/>
            <span style={{ fontSize: 13 }}>
              Os mutirões para os quais se inscreveu e/ou criou aparecerão aqui.
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