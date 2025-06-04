import { FaUser, FaCog, FaUsers, FaEnvelope, FaComments } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  menuItems?: { icon: React.ReactNode; label: string; onClick?: () => void }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
}) => {
  const navigate = useNavigate();

  const defaultMenu = [
   {
      icon: <FaUser />,
      label: "Perfil",
      active: true,
      onClick: () => navigate("/editarusuario"), // Aqui é o redirecionamento para a página EditarUsuario
    },
    { icon: <FaUsers />, label: "Comunidade" },
    { icon: <FaEnvelope />, label: "Mensagens" },
    { icon: <FaComments />, label: "Chat", onClick: () => navigate('/chat') },
    { icon: <FaCog />, label: "Configurações" },
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
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 