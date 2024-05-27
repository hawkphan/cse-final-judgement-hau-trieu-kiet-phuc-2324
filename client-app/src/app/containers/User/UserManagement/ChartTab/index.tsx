import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import Chart, { Props } from "react-apexcharts";
  import dayjs from "dayjs";
import { useGetOverallStatistic, useGetProblemsStatistic, useGetSolutionsStatistic } from "../../../../queries/Management";
import { API_QUERIES } from "../../../../queries";
import { MuiDatePicker } from "../../../../shared";
  function CalculateTotal(array: number[]) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum;
  }
  
  const ChartTab = () => {
    const [selectedSolutionStatisticDate, setSolutionStatisticDate] =
      useState<Date | null>(new Date());
    const [selectedProblemsStatisticDate, setProblemsStatisticDate] =
      useState<Date | null>(new Date());
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
      date: selectedSolutionStatisticDate.toISOString(),
      queryKey: [
        API_QUERIES.GET_SOLLUTIONS_STATISTIC,
        selectedSolutionStatisticDate.toISOString(),
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
    }, [selectedSolutionStatisticDate]);
  
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
              title="Solutions"
              subheader={`Today: ${new Date().toLocaleDateString()}`}
            />
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
              title="Processing Submissions"
              subheader={`Today: ${new Date().toLocaleDateString()}`}
            />
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
              title="Contest Statistic"
              subheader={`Today: ${new Date().toLocaleDateString()}`}
            />
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
              title="Problem Statistic"
              subheader={`Today: ${new Date().toLocaleDateString()}`}
            />
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
              title="Submissions"
              action={
                <Box>
                  <MuiDatePicker
                    value={dayjs(selectedSolutionStatisticDate)}
                    onChange={setSolutionStatisticDate}
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
              title="Problem Creation"
              action={
                <Box>
                  <MuiDatePicker
                    views={["year", "month"]}
                    value={dayjs(selectedProblemsStatisticDate)}
                    onChange={setProblemsStatisticDate}
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
  
  export default ChartTab;
  