import { Box, Card, CardContent } from "@mui/material";
import Chart, { Props } from "react-apexcharts";
import { useGetAnnualChartById } from "../../../../queries/Profiles/useGetAnnualChartById";
import { API_QUERIES } from "../../../../queries";
import { LoadingCommon } from "../../../../shared";

const state: Props = {
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      markers: {
        radius: 0,
      },
    },
  },
};

interface props {
  id: string;
}

export default function UserAnnualReport({ id }: props) {
  const { annualSubmission, isFetching } = useGetAnnualChartById({
    id,
    queryKey: [API_QUERIES.GET_ANNUAL_CHART_BY_ID, { id: id }],
  });

  const analyseData = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dataTotalSubmit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const dataMonths = ["", "", "", "", "", "", "", "", "", "", "", ""];

    if (annualSubmission.length == 12) {
      annualSubmission.map((item, index) => {
        dataTotalSubmit[index] = item.totalSubmissions;
        dataMonths[index] = monthNames[item.month - 1];
      });
    } else {
      let i = -1;
      let month: number = -1;
      annualSubmission.map((item, index) => {
        i = i == -1 ? 12 - annualSubmission.length : i;
        month = month == -1 ? item.month : month;
        dataTotalSubmit[12 - annualSubmission.length + index] =
          item.totalSubmissions;
        dataMonths[12 - annualSubmission.length + index] =
          monthNames[item.month - 1];
      });

      let j = i;
      dataMonths.map((item, index) => {
        if (i > index) {
          month = month - j;
          if (month < 0) {
            month += 12;
          }
          j -= 1;

          dataMonths[index] = monthNames[month - 1];
        }
      });
    }

    return { dataTotalSubmit, dataMonths };
  };

  const { dataTotalSubmit, dataMonths } = analyseData();

  state.series = [
    {
      name: "submissions",
      data: dataTotalSubmit,
    },
  ];

  state.options.xaxis = { categories: dataMonths };

  if (isFetching) {
    <LoadingCommon />;
  }
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
