import { Outlet, useLocation } from "react-router-dom";
import { NavBar, Footer } from "../components";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const HomeLayout = () => {
  const { usuario } = useAuth();
  const location = useLocation();

  // Lista de rotas onde a Sidebar deve aparecer
  const sidebarRoutes = ["/user", "/chat", "/mutiroes", "/configuracoes", "/faq", "/editarusuario", "/notificacoes"];

  // Verifica se a rota atual está na lista de rotas que devem mostrar a Sidebar
  const shouldShowSidebar =
    usuario &&
    sidebarRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div>
      <NavBar />
      <div
        className="page-wrapper"
        style={{
          paddingTop: "calc(var(--nav-height) + calc(var(--nav-height) / 2))",
          display: "flex",
        }}
      >
        {shouldShowSidebar && (
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
