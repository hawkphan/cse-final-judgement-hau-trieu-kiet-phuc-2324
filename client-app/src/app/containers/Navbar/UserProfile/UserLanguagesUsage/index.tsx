import { Card, CardContent, Typography } from "@mui/material";
import { Suspense } from "react";
import { LoadingCommon } from "../../../../shared";
import { useGetLanguagesUsageById } from "../../../../queries/Profiles/useGetLanguagesUsageChartById";
import { API_QUERIES } from "../../../../queries";
import Chart, { Props } from "react-apexcharts";
import { getLanguageNameById } from "../../../Problems/ProblemDetails/SubmissionTab/helpers";

const state: Props = {
  options: {
    labels: [],
  },
  series: [],
};

interface props {
  id: string;
}

export default function UserLanguagesUsage({ id }: props) {
  const { languagesUsage, isFetching } = useGetLanguagesUsageById({
    id,
    queryKey: [API_QUERIES.GET_LANGUAGES_CHART_BY_ID, { id: id }],
  });

  state.options.labels = languagesUsage.map((item) =>
    getLanguageNameById(item.languageId)
  );

  state.series = languagesUsage.map((item) => item.totalSubmissions);

  if (state.options.labels.length < state.series.length || isFetching) {
    <LoadingCommon />;
  }
  return (
    <Card
      style={{
        marginTop: "20px",
        padding: "20px",
        paddingTop: "10px",
        minHeight: "300px",
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
          <Chart
            series={state.series}
            options={state.options}
            type="pie"
            width="100%"
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
