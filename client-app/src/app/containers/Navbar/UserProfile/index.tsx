

import UserDetailInformation from "./UserDetailInformation";
import UserActivityReport from "./UserActivityReport";
import UserSubmission from "./UserSubmission";
import UserAnnualReport from "./UserAnnualSubmissionReport";
import { Box, Grid } from "@mui/material";
import UserAchievement from "./UserAchievements";
import { profileInfo } from "./TestData/dataUserProfile.mock";
import { User } from "./TestData/userProfileModel";

export default function UserProfile() {
  const userProfile = profileInfo.user as User
  return (
    <Grid container spacing={2} style={{ padding: "10px", fontFamily: 'Roboto' }} wrap='wrap'>
      <Grid item xs={3}>
        <UserDetailInformation/>
      </Grid>

      <Grid item xs={9}>
        <Box display="flex" flexDirection="column" sx={{minWidth: '180px'}}>
          <Box
            sx={{ width: "100%"}}
            flexDirection="row"
            display="flex"
            justifyContent="space-between"
          >
            <Box sx={{ width: "49%"}}>
              <UserActivityReport />
            </Box>

            <Box sx={{ width: "49%"}}>
              <UserAchievement />
            </Box>
          </Box>

          <Box sx={{ width: "100%", minWidth: '180px' }}>
            <UserAnnualReport />
          </Box>
          <Box sx={{ width: "100%", minWidth: '180px'}} >
            <UserSubmission/>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
