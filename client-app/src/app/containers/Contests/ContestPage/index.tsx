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
import { API_QUERIES, useGetContestById } from "../../../queries";
import { compareOrder } from "../ContestManagement/ContestForm/helpers";
import MonitoringTab from "./MonitoringTab";
import { useStore } from "../../../shared/common/stores/store";

const ContestPage = () => {
  const { id } = useParams<{ id: string }>();
  const { userStore } = useStore();

  const { contest, isFetching } = useGetContestById({
    id,
    queryKey: [API_QUERIES.GET_CONTEST_BY_ID, { id: id }],
  });

  const member = contest?.members.find(
    (item) => item.userId === userStore?.user?.id
  );

  const isAdmin = member?.role === 0;

  const [tab, setTab] = useState(isAdmin ? Tab.MONITORING : Tab.PROBLEMS);

  const renderTab = () => {
    switch (tab) {
      case Tab.PROBLEMS:
        return <ProblemsTab problems={contest?.problems} />;
      case Tab.SUBMIT_CODE:
        return <SubmitCodeTab contest={contest} />;
      case Tab.MY_SUBMISSIONS:
        return <MySubmissionTab contest={contest} />;
      case Tab.STANDINGS:
        return <StandingsTab />;
      case Tab.MONITORING:
        return <MonitoringTab contest={contest} />;
      default:
        <LoadingCommon />;
    }
  };

  if (isFetching) {
    return <LoadingCommon />;
  }

  return (
    <Container maxWidth="xl" style={{ padding: "10px" }}>
      <Stack>
        <Grid.Wrap>
          <Grid.Item xs={12}>
            <Card sx={{ minHeight: "700px" }}>
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
