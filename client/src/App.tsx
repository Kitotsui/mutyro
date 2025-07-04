import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Error,
  User,
  NovoMutirao,
  VisualizarMutirao,
  Notificacoes,
} from "./pages";
import { AuthProvider } from "./context/AuthContext";
import EditarMutirao from "./pages/EditarMutirao";
import CalendarioCompleto from "./pages/CalendarioCompleto";
import FAQ from "./pages/FAQ";
import Configuracoes from "./pages/Configuracoes";

import { action as novoMutiraoAction } from "./pages/NovoMutirao";
import { loader as userLoader } from "./pages/User";
import { loader as visualizarMutiraoLoader } from "./pages/VisualizarMutirao";
import { action as editarMutiraoAction } from "./pages/EditarMutirao";
import { loader as landingLoader } from "./pages/Landing";
import { loader as novoMutiraoLoader } from "./pages/NovoMutirao";
import { loader as calendarioCompletoLoader } from "./pages/CalendarioCompleto";
import EditarUsuario from "./pages/EditarUsuario";
import { IdiomaProvider } from "./context/IdiomaContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
      },
      {
        path: "mutiroes",
        element: <CalendarioCompleto />,
        loader: calendarioCompletoLoader,
      },
      {
        path: "user",
        element: <User />,
        loader: userLoader,
      },
      {
        path: "novo-mutirao",
        element: <NovoMutirao />,
        action: novoMutiraoAction,
        loader: novoMutiraoLoader,
      },
      {
        path: "mutirao/:id",
        element: <VisualizarMutirao />,
        loader: visualizarMutiraoLoader,
      },
      {
        path: "mutirao/:id/editar",
        element: <EditarMutirao />,
        loader: visualizarMutiraoLoader,
        action: editarMutiraoAction,
      },
      {
        path: "notificacoes",
        element: <Notificacoes />,
      },
      {
        path: "editarusuario",
        element: <EditarUsuario />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "configuracoes",
        element: <Configuracoes />,
      },
    ],
  },
  {
    path: "/error",
    element: <Error />,
  },
]);

const App = () => {
  return (
    <IdiomaProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </IdiomaProvider>
  );
};

export default App;
