import { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../containers/Navbar";
import "react-material-symbols/rounded";
import "react-material-symbols/outlined";
import "react-material-symbols/sharp";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "../containers/ProtectedRoute";

const ConditionalNavbar = () => {
  const location = useLocation();
  const unusedPaths = ["/login", "/signup", "/"];

  if (unusedPaths.includes(location.pathname)) {
    return <></>;
  }
  return (
    <ProtectedRoute>
      <Navbar />
    </ProtectedRoute>
  );
};

function App() {
  return (
    <Fragment>
      <ConditionalNavbar />
      <ToastContainer theme="colored" />
      <Outlet />
    </Fragment>
  );
}

export default App;
