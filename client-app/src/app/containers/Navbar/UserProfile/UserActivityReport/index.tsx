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
import { useGetSubmissionStatisticChartById } from "../../../../queries/Profiles/useGetSubmissionStatisticChartById";
import { API_QUERIES, DifficultyStatistic } from "../../../../queries";
import { LoadingCommon } from "../../../../shared";

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

export function DifficultyStatisticDetail({
  difficulty,
  totalSubmissions,
  totalSolved,
}: DifficultyStatistic) {
  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "15px",
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Typography color="text.secondary">Difficulty: {difficulty}</Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography color="text.primary">
            {totalSolved} /{totalSubmissions}
          </Typography>
        </Box>
      </Box>

      <LinearProgress
        variant="determinate"
        value={(totalSolved / totalSubmissions) * 100}
        color="success"
      />
    </Box>
  );
}

export interface Props {
  id: string;
}

export default function UserActivityReport({ id }: Props) {
  const { submissionStatistic, isFetching } =
    useGetSubmissionStatisticChartById({
      id,
      queryKey: [API_QUERIES.GET_SUBMISSIONS_CHART_BY_ID, { id: id }],
    });

  function calculateTotalProblemSolvedPercent() {
    return (
      (submissionStatistic.totalSolvedSubmissions /
        submissionStatistic.totalSubmissions) *
      100
    );
  }

  if (isFetching) {
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
          Solved Problems
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
              paddingRirth: "20px",
            }}
          >
            {submissionStatistic.collectionDifficultyStatistic &&
              submissionStatistic.collectionDifficultyStatistic.map((item) => (
                <DifficultyStatisticDetail
                  difficulty={item.difficulty}
                  totalSubmissions={item.totalSolvedSubmissions}
                  totalSolved={item.totalSolved}
                ></DifficultyStatisticDetail>
              ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
