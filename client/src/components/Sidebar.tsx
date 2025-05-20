import { FaUser, FaCog, FaUsers, FaEnvelope, FaComments } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  menuItems?: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
}) => {
  const navigate = useNavigate();

  const defaultMenu = [
    { icon: <FaUser />, label: "Perfil", active: true },
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
              className={item.active ? "active" : ""}
              onClick={item.onClick}
              style={{ cursor: item.onClick ? "pointer" : "default" }}
            >
              {item.icon}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 