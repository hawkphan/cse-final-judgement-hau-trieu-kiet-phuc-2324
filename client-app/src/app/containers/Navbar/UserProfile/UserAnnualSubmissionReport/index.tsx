import { Box, Card, CardContent } from "@mui/material";
import Chart, { Props } from "react-apexcharts";
import { API_QUERIES, useGetAnnualChartById } from "../../../../queries";
import { LoadingCommon } from "../../../../shared";
import { useEffect, useState } from "react";

interface UserAnnualReportProps {
  id: string;
}

export default function UserAnnualReport({
  id,
}: Readonly<UserAnnualReportProps>) {
  const [state, setState] = useState<Props>({
    options: {
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      grid: {
        padding: {
          right: 30,
          left: 20,
        },
      },

      title: {
        text: "Activity History",
        align: "left",
        style: {
          fontSize: "20px",
          fontFamily: "Roboto",
        },
      },
      xaxis: {
        categories: [],
      },
      legend: {
        markers: {
          radius: 0,
        },
      },
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });
  const {
    annualSubmission,
    isFetching,
    handleInvalidateAnnualSubmission,
    onGetAnnualSubmission,
  } = useGetAnnualChartById({
    id,
    queryKey: [API_QUERIES.GET_ANNUAL_CHART_BY_ID, { id: id }],
  });

  useEffect(() => {
    const getAnalysisData = () => {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const dataTotalSubmit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const dataMonths = ["", "", "", "", "", "", "", "", "", "", "", ""];

      annualSubmission.map((item, index) => {
        dataTotalSubmit[index] = item.totalSubmissions;
        dataMonths[index] = monthNames[item.month - 1];
      });

      return { dataTotalSubmit, dataMonths };
    };

    const { dataTotalSubmit, dataMonths } = getAnalysisData();

    const series = [
      {
        name: "Submissions",
        data: dataTotalSubmit,
      },
    ];
    setState((prevState) => ({
      ...prevState,
      series,
    }));

    const xaxis = {
      type: "datetime",
      categories: dataMonths,
    };
    setState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis,
      },
    }));
  }, [annualSubmission]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleInvalidateAnnualSubmission();
      onGetAnnualSubmission();
    }, 30000);

    return () => {
      clearTimeout(timerId);
    };
  }, [
    annualSubmission,
    handleInvalidateAnnualSubmission,
    isFetching,
    onGetAnnualSubmission,
  ]);

  if (isFetching) {
    <LoadingCommon />;
  }
  return (
    <Card
      style={{
        marginTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        minWidth: "180px",
      }}
      elevation={4}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ marginTop: "40px" }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          ></Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          ></Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box flexDirection="column" sx={{ width: "80%", margin: "auto" }}>
            <Chart
              series={state.series}
              type="line"
              options={state.options}
              height={400}
              width="100%"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
