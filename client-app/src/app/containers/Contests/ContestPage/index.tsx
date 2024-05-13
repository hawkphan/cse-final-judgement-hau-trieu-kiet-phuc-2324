/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, Container, Stack } from "@mui/material";
import { Tab, getTabList } from "./helpers";
import {
  AnimatedTabPanel,
  Grid,
  LoadingCommon,
  TabsBar,
} from "../../../shared";
import { useState } from "react";
import SubmitCodeTab from "./SubmitCodeTab";
import StandingsTab from "./StandingsTab";
import MySubmissionTab from "./MySubmissionsTab";
import ProblemsTab from "./ProblemsTab";
import { useParams } from "react-router-dom";

const ContestPage = () => {
  const isAdmin = false;

  const [tab, setTab] = useState(isAdmin ? Tab.MONITORING : Tab.PROBLEMS);

  const { id } = useParams();

  const renderTab = () => {
    switch (tab) {
      case Tab.PROBLEMS:
        return <ProblemsTab />;
      case Tab.SUBMIT_CODE:
        return <SubmitCodeTab />;
      case Tab.MY_SUBMISSIONS:
        return <MySubmissionTab />;
      case Tab.STANDINGS:
        return <StandingsTab />;
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
                    tabsList={getTabList(isAdmin)}
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
