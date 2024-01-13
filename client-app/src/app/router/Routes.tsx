import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/Home";

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
        element: <div>this is problem list view</div>,
      },

      {
        path: "developer",
        element: <div>this is developer</div>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
