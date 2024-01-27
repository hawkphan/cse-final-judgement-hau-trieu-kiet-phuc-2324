import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../containers/HomePage";
import Problems from "../containers/Problems";
import Developer from "../containers/Developer";
import UserProfile from "../containers/Navbar/UserProfile";
import LoginSide from "../containers/User/LoginForm";
import { PATHS } from "../configs/paths";

export const routes: RouteObject[] = [
  {
    path: PATHS.root,
    element: <App />,
    children: [
      {
        path: PATHS.root,
        element: <HomePage />,
      },
      {
        path: PATHS.problems,
        element: <Problems />,
      },

      {
        path: PATHS.dev,
        element: <Developer />,
      },

      {
        path: PATHS.profile,
        element: <UserProfile />,
      },
      {
        path: PATHS.login,
        element: <LoginSide />,
      },
      {
        path: PATHS.problemDetails,
        element: <>123</>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
