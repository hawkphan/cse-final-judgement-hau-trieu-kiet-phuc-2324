import UserDetailInformation from "./UserDetailInformation";
import UserActivityReport from "./UserActivityReport";
import UserAnnualReport from "./UserAnnualSubmissionReport";
import { Grid } from "@mui/material";
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
      <Grid item xs={12}>
        <UserDetailInformation id={id} />
      </Grid>

      <Grid item xs={6}>
        <UserActivityReport id={id} />
      </Grid>
      <Grid item xs={6}>
        <UserLanguagesUsage id={id} />
      </Grid>
      <Grid item xs={12}>
        <UserAnnualReport id={id} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
