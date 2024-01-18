import { Fragment } from "react";

import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../containers/Navbar";
import UserProfile from "../containers/Navbar/UserProfile";

// Code Start Here
function App() {
  return (
    <Fragment>
      <Navbar />
      {/* <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>  */}
      <UserProfile/>
    </Fragment>
  );
}

export default App;
