import { FaUser, FaCog, FaEnvelope, FaComments, FaCalendarAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { contarNotificacoesNaoLidas } from "../services/notificacaoService";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  menuItems?: { icon: React.ReactNode; label: string; onClick?: () => void }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
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
      label: t('sidebar.perfil'),
      active: location.pathname === "/editarusuario",
      onClick: () => navigate("/editarusuario"),
    },
    { 
      icon: <FaCalendarAlt />, 
      label: t('sidebar.mutiroes'), 
      active: location.pathname === "/mutiroes",
      onClick: () => navigate('/mutiroes') 
    },
    {
      icon: (
        <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32 }}>
          <FaEnvelope style={{ fontSize: 24, color: "#222" }} />
          {naoLidas > 0 && (
            <div className="badge" style={{ zIndex: 2 }}>{naoLidas}</div>
          )}
        </span>
      ),
      label: t('sidebar.notificacoes'),
      active: location.pathname === "/notificacoes",
      onClick: () => navigate('/notificacoes'),
    },
    { 
      icon: <FaComments />, 
      label: t('sidebar.faq'), 
      active: location.pathname === "/faq",
      onClick: () => navigate('/faq') 
    },
    { 
      icon: <FaCog />, 
      label: t('sidebar.configuracoes'), 
      active: location.pathname === "/configuracoes",
      onClick: () => navigate('/configuracoes') 
    },
  ];

  const menuItemsToUse = menuItems || defaultMenu;

  return (
    <div className="sidebar-wrapper">
      <div className="main-sidebar">
        <nav>
          <ul>
            {menuItemsToUse.map((item) => (
              <li
                key={item.label}
                onClick={item.onClick}
                className={item.active ? "active" : ""}
                style={{ cursor: item.onClick ? "pointer" : "default" }}
                title={item.label}
              >
                {item.icon}
                <span className="sidebar-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 