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
import Contests from "../containers/Contests";
import ContestForm from "../containers/Contests/UnregisteredListView/ContestForm";
import EditProfile from "../containers/Navbar/UserProfile/EditProfile";
import ProtectedRoute from "../containers/ProtectedRoute";
import ContestPage from "../containers/Contests/ContestPage";
import UserManagement from "../containers/User/UserManagement";
import ContestManagement from "../containers/Contests/ContestManagement";

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
        element: (
          <ProtectedRoute>
            <Problems />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.dev,
        element: <Developer />,
      },
      {
        path: PATHS.profile,
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.editProfile,
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.login,
        element: <LoginSide />,
      },
      {
        path: PATHS.signup,
        element: <SignUp />,
      },
      {
        path: PATHS.problemDetails,
        element: (
          <ProtectedRoute>
            <ProblemDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.createProblem,
        element: (
          <ProtectedRoute>
            <ProblemForm />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.editProblem,
        element: (
          <ProtectedRoute>
            <ProblemForm />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.contests,
        element: (
          <ProtectedRoute>
            <Contests />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.createContest,
        element: (
          <ProtectedRoute>
            <ContestForm />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.editContest,
        element: (
          <ProtectedRoute>
            <ContestForm />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.contestPage,
        element: (
          <ProtectedRoute>
            <ContestPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.users,
        element: (
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.contestManagement,
        element: (
          <ProtectedRoute>
            <ContestManagement />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
