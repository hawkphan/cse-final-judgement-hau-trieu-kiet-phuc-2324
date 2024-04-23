import UserDetailInformation from "./UserDetailInformation";
import UserActivityReport from "./UserActivityReport";
import UserAnnualReport from "./UserAnnualSubmissionReport";
import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import UserLanguagesUsage from "./UserLanguagesUsage";

export const UserProfile = () => {
  const { id } = useParams();

  return (
    <Grid
      container
      spacing={2}
      style={{ padding: "10px", fontFamily: "Roboto" }}
      wrap="wrap"
    >
      <Grid item xs={3}>
        <UserDetailInformation id={id} />
      </Grid>

      <Grid item xs={9}>
        <Box display="flex" flexDirection="column" sx={{ minWidth: "180px" }}>
          <Box
            sx={{ width: "100%" }}
            flexDirection="row"
            display="flex"
            justifyContent="space-between"
          >
            <Box sx={{ width: "49%" }}>
              <UserActivityReport id={id}/>
            </Box>

            <Box sx={{ width: "49%" }}>
              <UserLanguagesUsage id={id}/>
            </Box>
          </Box>

          <Box sx={{ width: "100%", minWidth: "180px" }}>
            <UserAnnualReport id={id}/>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
