import { Fragment } from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../containers/Navbar";
import { Container } from "@mui/material";

// Code Start Here
function App() {
  return (
    <Fragment>
      <Navbar />
      <Container style={{fontFamily: 'Roboto'}}>
        <Outlet />
      </Container>
    </Fragment>
  );
}

export default App;
