import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Register,
  Login,
  Landing,
  Error,
  //User
} from "./pages";

import {action as registerAction} from "./pages/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
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
  /*{
    path: "user",
    element: <User />,
  }*/
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
