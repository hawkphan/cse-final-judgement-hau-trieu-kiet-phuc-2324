import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../containers/HomePage";
import Problems from "../containers/Problems";
import Developer from "../containers/Developer";
import UserProfile from "../containers/Navbar/UserProfile";
import LoginForm from "../containers/User/LoginForm";
import LoginSide from "../containers/User/LoginForm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "problems",
        element: <Problems />,
      },

      {
        path: "developer",
        element: <Developer />,
      },

      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "login",
        element: <LoginSide />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
