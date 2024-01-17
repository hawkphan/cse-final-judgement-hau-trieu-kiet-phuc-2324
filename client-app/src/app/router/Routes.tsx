import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/Home";
import Problems from "../containers/Problems";
import Developer from "../containers/Developer";

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
