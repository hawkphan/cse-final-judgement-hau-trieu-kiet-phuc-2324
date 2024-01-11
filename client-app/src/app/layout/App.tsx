import axios from "axios";
import { Activity } from "../models/activity";
import { Component, Fragment, useEffect, useState } from "react";
import {
  Container,
  Dropdown,
  Grid,
  GridColumn,
  GridRow,
  Menu,
  Segment,
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import "./css/navbar.css";

import NavBar from "./NavBar";
import CustomFooter from "./Footer";
import ActivitityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ProblemPage from "../pages/Problem";


import { Outlet } from "react-router-dom";
import { Problem } from "../models/problem";
import ProblemSet from "../pages/ProblemSet";
import { mockProblemList } from "../mock/MockProblems";
import Test from "../pages/MainPage";
import MainPage from "../pages/MainPage";

// Code Start Here
function App(){
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);
  function handleSelectActivity(id: String) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: String) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }


  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
        {/* <ProblemSet problems={mockProblemList} /> */}
         {/* <ProblemPage/>  */}
       <MainPage/>
      </Container>

      <CustomFooter />
    </Fragment>
  );
}

export default App;
