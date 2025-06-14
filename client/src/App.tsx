import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HomeLayout, Landing, Error, User, NovoMutirao, VisualizarMutirao, Notificacoes} from "./pages";
import {AuthProvider} from "./context/AuthContext";
import EditarMutirao from "./pages/EditarMutirao";

import { action as novoMutiraoAction } from "./pages/NovoMutirao";
import { loader as userLoader } from "./pages/User";
import { loader as visualizarMutiraoLoader } from "./pages/VisualizarMutirao";
import { action as editarMutiraoAction } from "./pages/EditarMutirao";
import { loader as landingLoader } from "./pages/Landing";
import { loader as novoMutiraoLoader } from "./pages/NovoMutirao";

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
    ],
  },
  {
    path: "/error",
    element: <Error />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
