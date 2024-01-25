import { Fragment } from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../containers/Navbar";

// Code Start Here
function App() {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}

export default App;
