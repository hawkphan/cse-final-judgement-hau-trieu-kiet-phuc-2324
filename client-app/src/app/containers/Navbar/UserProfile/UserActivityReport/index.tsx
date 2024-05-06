/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  CircularProgressProps,
  LinearProgress,
  Typography,
} from "@mui/material";
import {
  API_QUERIES,
  DifficultyStatistic,
  useGetProblemStatisticChartById,
} from "../../../../queries";
import { LoadingCommon } from "../../../../shared";
import { useEffect } from "react";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        size="7rem"
        style={{ color: "#63F031", marginTop: "15px" }}
      />
      <Box
        sx={{
          top: 15,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)} %`}
        </Typography>
        <Typography variant="caption" component="div" color="text.primary">
          SOLVED
        </Typography>
      </Box>
    </Box>
  );
}

type StatisticProps = { data: DifficultyStatistic[] };

export function DifficultyStatisticDetail({ data }: StatisticProps) {
  function difficultyConvert(difficulty: number): string {
    switch (difficulty) {
      case 0:
        return "Below 1000";
      case 1:
        return "From 1000 to 2000";
      case 2:
        return "Over 2000";
      default:
        return "";
    }
  }

  return (
    <>
      {data &&
        data.map((stat) => {
          return (
            <Box
              sx={{
                width: "100%",
                marginBottom: "15px",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography color="text.secondary">
                  {difficultyConvert(stat.difficulty)}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography color="text.primary">
                    {stat.totalSolved} / {stat.totalProblems}
                  </Typography>
                </Box>
              </Box>

              <LinearProgress
                variant="determinate"
                value={
                  stat.totalProblems != 0
                    ? (stat.totalSolved / stat.totalProblems) * 100
                    : 0
                }
                color="success"
              />
            </Box>
          );
        })}
    </>
  );
}

export interface Props {
  id: string;
}

export default function UserActivityReport({ id }: Props) {
  const {
    problemStatistic,
    isFetching,
    handleInvalidateStatisticSubmission,
    onGetProblemStatisticSubmission,
  } = useGetProblemStatisticChartById({
    id,
    queryKey: [API_QUERIES.GET_PROBLEMS_CHART_BY_ID, { id: id }],
  });

  function calculateTotalProblemSolvedPercent() {
    if (problemStatistic.totalProblems == 0) {
      return 0;
    }
    return (
      (problemStatistic.totalSolvedProblems / problemStatistic.totalProblems) *
      100
    );
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleInvalidateStatisticSubmission();
      onGetProblemStatisticSubmission();
    }, 30000);

    return () => {
      clearTimeout(timerId);
    };
  }, [
    problemStatistic,
    handleInvalidateStatisticSubmission,
    isFetching,
    onGetProblemStatisticSubmission,
  ]);

  if (isFetching) {
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
          sx={{ fontSize: 20, fontWeight: "bold", marginBottom: "40px" }}
          color="text.secondary"
          gutterBottom
        >
          Solved Problems on Difficulties
        </Typography>

        <Box display="flex" flexDirection="row">
          <Box
            flexDirection="column"
            sx={{ width: "150px", marginTop: "40px" }}
          >
            <CircularProgressWithLabel
              value={calculateTotalProblemSolvedPercent()}
            />
          </Box>

          <Box
            sx={{
              minWidth: "100px",
              width: "100%",
              paddingLeft: "20px",
            }}
          >
            <DifficultyStatisticDetail
              data={problemStatistic.difficultyStatistics}
            ></DifficultyStatisticDetail>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
