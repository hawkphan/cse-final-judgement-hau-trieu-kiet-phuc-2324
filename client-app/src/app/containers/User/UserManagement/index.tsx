import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Chart, { Props } from "react-apexcharts";
import { MuiDatePicker } from "../../../shared";
import { API_QUERIES } from "../../../queries";
import {
  useGetOverallStatistic,
  useGetProblemsStatistic,
  useGetSolutionsStatistic,
} from "../../../queries/Management";
import dayjs from "dayjs";
import { ImTrophy } from "react-icons/im";
import { FaCalendarCheck, FaLightbulb } from "react-icons/fa6";
import { IoSyncCircle } from "react-icons/io5";

function CalculateTotal(array: number[]) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

const UserManagement = () => {
  const currentTime = new Date();
  const [selectedStartDate, setStartDate] = useState<Date | null>(currentTime);
  const [selectedEndDate, setEndDate] = useState<Date | null>(currentTime);
  const [selectedProblemsStatisticDate, setProblemsStatisticDate] =
    useState<Date | null>(currentTime);
  const [solutionsDataState, setSolutionsDataState] = useState<Props>({
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },
      colors: ["#4154f1", "#2eca6a", "#ff771d"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
    series: [
      {
        name: "Submissions",
        data: [],
      },
    ],
  });
  const [problemsDataState, setProblemsDataState] = useState<Props>({
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },
      colors: ["#4154f1", "#2eca6a", "#ff771d"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
    series: [],
  });

  function handleStartTimeChange(time: Date) {
    setStartDate(time);
  }
  function handleEndTimeChange(time: Date) {
    setEndDate(time);
  }
  function handleProblemTimeChange(time: Date) {
    setProblemsStatisticDate(time);
  }

  const {
    overallStatistic,
    onGetOverallStatistic,
    handleInvalidateOverallStatistic,
    isFetching: isOverallStatisticFetching,
  } = useGetOverallStatistic({
    queryKey: [API_QUERIES.GET_OVERALL_STATISTIC],
  });

  const {
    problemsStatistic,
    onGetProblemsStatistic,
    handleInvalidateProblemsStatistic,
    isFetching: isProblemsStatisticFetching,
  } = useGetProblemsStatistic({
    date: selectedProblemsStatisticDate.toISOString(),
    queryKey: [
      API_QUERIES.GET_PROBLEMS_STATISTIC,
      selectedProblemsStatisticDate.toISOString(),
    ],
  });

  const {
    solutionsStatistic,
    onGetSolutionStatistic,
    handleInvalidateSolutionsStatistic,
    isFetching: isSolutionsStatisticFetching,
  } = useGetSolutionsStatistic({
    startDate: selectedStartDate.toISOString(),
    endDate: selectedEndDate.toISOString(),
    queryKey: [
      API_QUERIES.GET_SOLLUTIONS_STATISTIC,
      selectedStartDate.toISOString(),
      selectedEndDate.toISOString(),
    ],
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleInvalidateOverallStatistic();
      onGetOverallStatistic();

      handleInvalidateProblemsStatistic();
      onGetProblemsStatistic();

      handleInvalidateSolutionsStatistic();
      onGetSolutionStatistic();
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [
    overallStatistic,
    handleInvalidateOverallStatistic,
    isOverallStatisticFetching,
    onGetOverallStatistic,

    problemsStatistic,
    handleInvalidateProblemsStatistic,
    onGetProblemsStatistic,
    isProblemsStatisticFetching,

    solutionsStatistic,
    handleInvalidateSolutionsStatistic,
    onGetSolutionStatistic,
    isSolutionsStatisticFetching,
  ]);

  useEffect(() => {
    handleInvalidateProblemsStatistic();
    onGetProblemsStatistic();
  }, [selectedProblemsStatisticDate]);

  useEffect(() => {
    handleInvalidateSolutionsStatistic();
    onGetSolutionStatistic();
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    const xaxis = {
      type: "datetime",
      categories: solutionsStatistic.times,
    };

    setSolutionsDataState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis,
      },
    }));

    const series = [
      {
        name: "Submissions",
        data: solutionsStatistic.values,
      },
    ];
    setSolutionsDataState((prevState) => ({
      ...prevState,
      series,
    }));
  }, [solutionsStatistic]);

  useEffect(() => {
    const xaxis = {
      type: "datetime",
      categories: problemsStatistic.times,
    };
    setProblemsDataState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis,
      },
    }));

    const series = [
      {
        name: "Submissions",
        data: problemsStatistic.values,
      },
    ];
    setProblemsDataState((prevState) => ({
      ...prevState,
      series,
    }));
  }, [problemsStatistic]);
  return (
    <Grid
      container
      spacing={3}
      style={{ padding: "10px", fontFamily: "Roboto" }}
      wrap="wrap"
    >
      <Grid item xs={3}>
        <Card sx={{ height: "200px" }} elevation={4}>
          <CardHeader
            sx={{ height: "50px" }}
            titleTypographyProps={{
              sx: { fontWeight: "bold", fontSize: "24px" },
            }}
            title="Solutions"
            subheader={`Today: ${new Date().toLocaleDateString()}`}
            action={
              <FaLightbulb
                style={{
                  color: "gold",
                  width: "35px",
                  height: "35px",
                  marginRight: "10px",
                }}
              />
            }
          />
          <Divider sx={{ width: "90%", margin: "auto" }} />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" component="div" color="text.primary">
                  Accepted:
                </Typography>
                <Typography variant="h6" component="div" color="text.secondary">
                  {overallStatistic?.solutionStatistic?.todayAccepted ?? 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" component="div" color="text.primary">
                  Failed:
                </Typography>
                <Typography variant="h6" component="div" color="text.secondary">
                  {overallStatistic?.solutionStatistic?.todayRejected ?? 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card sx={{ height: "200px" }} elevation={4}>
          <CardHeader
            sx={{ height: "50px" }}
            titleTypographyProps={{
              sx: { fontWeight: "bold", fontSize: "24px" },
            }}
            title="Processing Submissions"
            subheader={`Today: ${new Date().toLocaleDateString()}`}
            action={
              <IoSyncCircle
                style={{
                  color: "#00c853",
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
            }
          />
          <Divider sx={{ width: "90%", margin: "auto" }} />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" component="div" color="text.primary">
                  Processing:
                </Typography>
                <Typography variant="h6" component="div" color="text.secondary">
                  {overallStatistic?.processingSubmissions ?? 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" component="div" color="text.primary">
                  In Queue:
                </Typography>
                <Typography variant="h6" component="div" color="text.secondary">
                  {overallStatistic?.inQueueSubmissions ?? 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card sx={{ height: "200px" }} elevation={4}>
          <CardHeader
            sx={{ height: "50px" }}
            titleTypographyProps={{
              sx: { fontWeight: "bold", fontSize: "24px" },
            }}
            title="Contest Statistic"
            subheader={`Today: ${new Date().toLocaleDateString()}`}
            action={
              <ImTrophy
                style={{
                  color: "gold",
                  width: "40px",
                  height: "40px",
                  marginRight: "10px",
                }}
              />
            }
          />
          <Divider sx={{ width: "90%", margin: "auto" }} />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" component="div" color="text.primary">
                  Total:
                </Typography>
                <Typography variant="h6" component="div" color="text.secondary">
                  {overallStatistic?.totalContests ?? 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" component="div" color="text.primary">
                  Started This Month:
                </Typography>
                <Typography variant="h6" component="div" color="text.secondary">
                  {overallStatistic?.thisMonthStartContests ?? 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card sx={{ height: "200px" }} elevation={4}>
          <CardHeader
            sx={{ height: "50px" }}
            titleTypographyProps={{
              sx: { fontWeight: "bold", fontSize: "24px" },
            }}
            title="Problem Statistic"
            subheader={`Today: ${new Date().toLocaleDateString()}`}
            action={
              <FaCalendarCheck
                style={{
                  color: "blue",
                  width: "40px",
                  height: "40px",
                  marginRight: "10px",
                }}
              />
            }
          />
          <Divider sx={{ width: "90%", margin: "auto" }} />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" component="div" color="text.primary">
                  Total:
                </Typography>
                <Typography variant="h6" component="div" color="text.secondary">
                  {overallStatistic?.totalProblems ?? 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" component="div" color="text.primary">
                  Created This Month:
                </Typography>
                <Typography variant="h6" component="div" color="text.secondary">
                  {overallStatistic?.thisMonthCreatedProblems ?? 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card sx={{ height: "600px" }} elevation={4}>
          <CardHeader
            sx={{ height: "50px" }}
            titleTypographyProps={{
              sx: { fontWeight: "bold", fontSize: "24px" },
            }}
            title="Submissions"
            action={
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ marginRight: "5px" }}>
                  <InputLabel sx={{ fontSize: "14px" }}>Start Time</InputLabel>
                  <MuiDatePicker
                    value={dayjs(selectedStartDate)}
                    onChange={handleStartTimeChange}
                  />
                </Box>
                <Box>
                  <InputLabel sx={{ fontSize: "14px" }}>End Time</InputLabel>
                  <MuiDatePicker
                    value={dayjs(selectedEndDate)}
                    onChange={handleEndTimeChange}
                  />
                </Box>
              </Box>
            }
          />

          <CardContent sx={{ padding: "15px 30px" }}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="flex-start"
              sx={{ paddingLeft: "20px" }}
            >
              <Typography
                variant="h6"
                component="div"
                color="text.primary"
                sx={{ marginRight: "10px" }}
              >
                Total submissions:
              </Typography>
              <Typography variant="h6" component="div" color="text.secondary">
                {CalculateTotal(solutionsStatistic.values)}
              </Typography>
            </Box>
            <Chart
              series={solutionsDataState.series}
              type="area"
              options={solutionsDataState.options}
              height={350}
              width={"100%"}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card sx={{ height: "600px" }} elevation={4}>
          <CardHeader
            sx={{ height: "50px" }}
            titleTypographyProps={{
              sx: { fontWeight: "bold", fontSize: "24px" },
            }}
            title="Problem Creation"
            action={
              <Box>
                <MuiDatePicker
                  views={["year", "month"]}
                  value={dayjs(selectedProblemsStatisticDate)}
                  onChange={handleProblemTimeChange}
                />
              </Box>
            }
          />

          <CardContent sx={{ padding: "15px 30px" }}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="flex-start"
              sx={{ paddingLeft: "20px" }}
            >
              <Typography
                variant="h6"
                component="div"
                color="text.primary"
                sx={{ marginRight: "10px" }}
              >
                Total:
              </Typography>
              <Typography variant="h6" component="div" color="text.secondary">
                {CalculateTotal(problemsStatistic.values)}
              </Typography>
            </Box>
            <Chart
              series={problemsDataState.series}
              type="area"
              options={problemsDataState.options}
              height={350}
              width={"100%"}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserManagement;
