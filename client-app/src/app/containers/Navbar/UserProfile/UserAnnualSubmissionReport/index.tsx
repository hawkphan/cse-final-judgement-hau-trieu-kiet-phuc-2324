import { Box, Card, CardContent, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { ImNotification } from "react-icons/im";
import { schema } from "../TestData/schema";
import { profileInfo } from "../TestData/dataUserProfile.mock";

export default function UserAnnualReport() {
  return (
    <Card
      style={{
        marginTop: "15px",
        paddingLeft: "20px",
        paddingRight: "20px",
        minHeight: "500px",
        minWidth: "180px",
      }}
      elevation={4}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ marginTop: "10px" }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >

          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
          </Box>
        </Box>

        <Box display="flex" flexDirection="row">
          <Box flexDirection="column" sx={{ width: "80%", margin: 'auto'}}>
            <ReactApexChart
              series={schema.series}
              type="line"
              options={schema.options}
              height={400}
              width="100%"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
