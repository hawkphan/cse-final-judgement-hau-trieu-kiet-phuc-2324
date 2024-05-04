import { Card, CardContent, Typography } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { LoadingCommon } from "../../../../shared";
import { useGetLanguagesUsageById } from "../../../../queries/Profiles/useGetLanguagesUsageChartById";
import { API_QUERIES } from "../../../../queries";
import Chart from "react-apexcharts";
import { getLanguageNameById } from "../../../Problems/ProblemDetails/SubmissionTab/helpers";


interface props {
  id: string;
}

export default function UserLanguagesUsage({ id }: props) {
  const [state, setState] = useState({
    options: {
      labels: [],
    },
    series: [],
  });
  const {
    languagesUsage,
    isFetching,
    onGetLanguagesUsage,
    handleInvalidateLanguageUsage,
  } = useGetLanguagesUsageById({
    id,
    queryKey: [API_QUERIES.GET_LANGUAGES_CHART_BY_ID, { id: id }],
  });

  useEffect(() => {
    const labels = languagesUsage.map((item) => getLanguageNameById(item.languageId));
    setState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        labels,
      },
    }));
  
    const series = languagesUsage.map((item) => item.totalSubmissions);
    setState((prevState) => ({
      ...prevState,
      series,
    }));
  }, [languagesUsage]);


  useEffect(() => {
    const timerId = setTimeout(() => {
      handleInvalidateLanguageUsage();
      onGetLanguagesUsage();
    }, 30000);

    return () => {
      clearTimeout(timerId);
    };
  }, [
    languagesUsage,
    handleInvalidateLanguageUsage,
    isFetching,
    onGetLanguagesUsage,
  ]);

  if (state.options.labels.length < state.series.length || isFetching || state.options.labels.length == 0) {
    <LoadingCommon />;
  }
  return (
    <Card
      style={{
        marginTop: "20px",
        padding: "20px",
        paddingTop: "10px",
        height: "330px",
        minWidth: "180px",
      }}
      elevation={4}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 20, fontWeight: "bold", marginBottom: "10px" }}
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
              height="100%"
            />
        </Suspense>
      </CardContent>
    </Card>
  );
}
