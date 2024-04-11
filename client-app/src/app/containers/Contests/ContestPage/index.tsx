/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Container, Stack } from "@mui/material";
import {
  Tab,
  tabsList
} from "./helpers";
import { AnimatedTabPanel, Grid, LoadingCommon, TabsBar } from "../../../shared";
import {  useState } from "react";
import SubmitCodeTab from "./SubmitCodeTab";
import StandingsTab from "./StandingsTab";
import MySubmissionTab from "./MySubmissionsTab";
import ProblemsTab from "./ProblemsTab";

const ContestPage = () => {
  const [tab, setTab] = useState(Tab.PROBLEMS);

  const renderTab = () => {
    switch (tab) {
      case Tab.PROBLEMS:
        return <ProblemsTab />;
      case Tab.SUBMITCODE:
        return <SubmitCodeTab/>;
      case Tab.MYSUBMISSIONS:
        return <MySubmissionTab/>;
      case Tab.STANDINGS:
        return <StandingsTab/>;
      default:
        <LoadingCommon />;
    }
  };

  return (
    <Container maxWidth="xl" style={{ padding: "10px" }}>
      <Stack>
        <Grid.Wrap>
          <Grid.Item xs={12}>
            <Card sx={{ height: "700px" }}>
              <Box>
                <Stack>
                  <TabsBar
                    tabsList={tabsList}
                    value={tab}
                    onChange={(_, value) => {
                      setTab(value);
                    }}
                  />
                  <AnimatedTabPanel
                    uniqKey={`userType-${tab}`}
                    transitionTime={0.2}
                  >
                    {renderTab()}
                  </AnimatedTabPanel>
                </Stack>
              </Box>
            </Card>
          </Grid.Item>    
        </Grid.Wrap>
      </Stack>
    </Container>
  );
};

export default ContestPage;
