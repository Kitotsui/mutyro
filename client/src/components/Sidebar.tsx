import { FaUser, FaCog, FaEnvelope, FaComments, FaCalendarAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { contarNotificacoesNaoLidas } from "../services/notificacaoService";

interface SidebarProps {
  menuItems?: { icon: React.ReactNode; label: string; onClick?: () => void }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
}) => {
  const navigate = useNavigate();
  const [naoLidas, setNaoLidas] = useState<number>(0);

  useEffect(() => {
    const fetchNaoLidas = async () => {
      try {
        const data = await contarNotificacoesNaoLidas();
        console.log("Resposta da API de notificações não lidas:", data, JSON.stringify(data));
        setNaoLidas(data.count || 0);
      } catch (e) {
        console.log("Erro ao buscar notificações não lidas:", e);
        setNaoLidas(0);
      }
    };
    fetchNaoLidas();
  }, []);

  const defaultMenu = [
    {
      icon: <FaUser />,
      label: "Perfil",
      active: true,
      onClick: () => navigate("/editarusuario"), // Aqui é o redirecionamento para a página EditarUsuario
    },
    { icon: <FaCalendarAlt />, label: "Mutirões", onClick: () => navigate('/mutiroes') },
    {
      icon: (
        <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32 }}>
          <FaEnvelope style={{ fontSize: 24, color: "#222" }} />
          {naoLidas > 0 && (
            <div className="badge" style={{ zIndex: 2 }}>{naoLidas}</div>
          )}
        </span>
      ),
      label: "Notificações",
      onClick: () => navigate('/notificacoes'),
    },
    { icon: <FaComments />, label: "FAQ", onClick: () => navigate('/faq') },
    { icon: <FaCog />, label: "Configurações", onClick: () => navigate('/configuracoes') },
  ];

  const menuItemsToUse = menuItems || defaultMenu;

  return (
    <div className="main-sidebar">
      <nav>
        <ul>
          {menuItemsToUse.map((item) => (
            <li
              key={item.label}
              onClick={item.onClick}
              style={{ cursor: item.onClick ? "pointer" : "default" }}
            >
              {item.icon}
              <span className="sidebar-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 