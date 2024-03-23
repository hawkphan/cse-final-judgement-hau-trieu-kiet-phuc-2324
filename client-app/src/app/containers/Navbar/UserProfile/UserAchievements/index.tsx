
import {  Card, CardContent, Typography } from "@mui/material";
import { Suspense} from "react";
import { LoadingCommon } from "../../../../shared";
import ReactApexChart from "react-apexcharts";
import { state } from "../TestData";

export default function UserAchievements() {
  return (
    <Card
      style={{
        marginTop: "20px",
        padding: "20px",
        paddingTop: "10px",
        minHeight: "290px",
        minWidth: "180px",
      }}
      elevation={4}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
          color="text.secondary"
          gutterBottom
        >
          Languages Usage
        </Typography>
        <Suspense fallback={<LoadingCommon />}>
        <ReactApexChart series={state.series} type="pie" options={state.options} width={350} />
      </Suspense>
      
      </CardContent>
    </Card>
  );
}
