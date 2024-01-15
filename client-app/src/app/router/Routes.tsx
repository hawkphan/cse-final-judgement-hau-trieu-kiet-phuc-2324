import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/Home";
import Developer from "../components/Developer";
import Problems from "../components/Problems";

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
    ],
  },
];

export const router = createBrowserRouter(routes);
