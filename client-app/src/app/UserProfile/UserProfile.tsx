import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import UserDetailInformation
export default function UserProfile() {
  return (
    <Grid container spacing={2} style={{ padding: "10px" }} wrap>
      <Grid item xs={3}>
        <UserDetailInformation/>
      </Grid>

      <Grid item xs={9}>
        <Box display="flex" flexDirection="column" >
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
              <UserAcchivements />
            </Box>
          </Box>

          <Box sx={{ width: "100%" }}>
            <UserAcchivements />
          </Box>
          <Box sx={{ width: "100%"}}>
            <UserAcchivements />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
