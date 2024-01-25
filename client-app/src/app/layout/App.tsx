import { Fragment } from "react";

import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../containers/Navbar";

const ConditionalNavbar = () => {
  const location = useLocation();
  const unusedPaths = ["/login", "/signup", "/signin", "/signup"];

  if (unusedPaths.includes(location.pathname)) {
    return <></>;
  }
  return <Navbar />;
};

function App() {
  return (
    <Fragment>
      <ConditionalNavbar />
      <Outlet />
    </Fragment>
  );
}

export default App;
