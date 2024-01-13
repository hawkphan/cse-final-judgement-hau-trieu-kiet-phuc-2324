import { Fragment } from "react";
import { Container } from "semantic-ui-react";

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

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
