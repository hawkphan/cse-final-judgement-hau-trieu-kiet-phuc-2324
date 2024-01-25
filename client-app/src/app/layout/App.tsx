import { Fragment } from "react";

import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../containers/Navbar";

const ComponentToHide = (props) => {
  const location = useLocation();
  const hideOn = ["/login", "/signup", "/signin", "/signup"];

  if (hideOn.includes(location.pathname)) {
    return <div></div>;
  }
  return <Navbar />;
};

function App() {
  return (
    <Fragment>
      <ComponentToHide />
      <Navbar />
      <Outlet />
    </Fragment>
  );
}

export default App;
