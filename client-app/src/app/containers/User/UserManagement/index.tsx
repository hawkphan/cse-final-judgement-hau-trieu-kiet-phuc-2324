import {
  Box,
  Card,
  Container,
  Stack,
} from "@mui/material";
import {  useState } from "react";
import { Tab, getTabList } from "./helpers";
import { AnimatedTabPanel, Grid, LoadingCommon, TabsBar } from "../../../shared";
import ChartTab from "./ChartTab";
import UserAccountsTab from "./UserAccountsTab";


const UserManagement = () => {

  const [tab, setTab] = useState(Tab.CHARTS );

  const renderTab = () => {
    switch (tab) {
      case Tab.CHARTS:
        return <ChartTab />;
      case Tab.USER_ACCOUNTS:
        return <UserAccountsTab/>;
      default:
        <LoadingCommon />;
    }
  };

  return (
    <Container maxWidth="xl" style={{ padding: "10px" }}>
    <Stack>
      <Grid.Wrap spacing={5} marginTop={1}>
        <Grid.Item xs={12}>
          <Card sx={{ minHeight: "700px" }}>
            <Box>
              <Stack>
                <TabsBar
                  tabsList={getTabList()}
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

export default UserManagement;
