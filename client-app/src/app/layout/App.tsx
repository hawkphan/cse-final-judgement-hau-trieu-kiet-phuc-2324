import { Fragment } from "react";

import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../containers/Navbar";

// Code Start Here
function App() {
  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </Fragment>
  );
}

export default App;
