import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../containers/HomePage";
import Problems from "../containers/Problems";
import Developer from "../containers/Developer";
import UserProfile from "../containers/Navbar/UserProfile";
import LoginSide from "../containers/User/LoginForm";
import { PATHS } from "../configs/paths";
import SignUp from "../containers/User/SignUpForm";
import ProblemDetail from "../containers/Problems/ProblemDetails";
import ProblemForm from "../containers/Problems/ProblemForm";

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
      },{
        path: PATHS.signup,
        element: <SignUp />,
      },
      {
        path: PATHS.problemDetails,
        element: <ProblemDetail />,
      },
      {
        path: PATHS.createProblem,
        element: <ProblemForm />,
      },
      {
        path: PATHS.editProblem,
        element: <ProblemForm />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
