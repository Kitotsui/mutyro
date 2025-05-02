import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Error,
  User,
  NovoMutirao,
  VisualizarMutirao,
} from "./pages";

import { action as novoMutiraoAction } from "./pages/NovoMutirao";
import { loader as userLoader } from "./pages/User";
import { loader as visualizarMutiraoLoader } from "./pages/VisualizarMutirao";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
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
      },
      {
        path: "mutirao/:id",
        element: <VisualizarMutirao />,
        loader: visualizarMutiraoLoader,
      },
    ],
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "user",
    element: <User />,
  },
  {
    path: "novo-mutirao",
    element: <NovoMutirao />,
  },
  {
    path: "mutirao/:id",
    element: <VisualizarMutirao />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
