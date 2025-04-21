import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Register,
  Login,
  Landing,
  Error,
  User,
  NovoMutirao,
  VisualizarMutirao,
} from "./pages";

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import {loader as userLoader} from './pages/User';  
import { action as novoMutiraoAction } from "./pages/NovoMutirao";

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
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
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
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
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
