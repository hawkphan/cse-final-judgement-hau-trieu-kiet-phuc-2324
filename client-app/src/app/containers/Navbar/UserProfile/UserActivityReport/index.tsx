/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, CardContent, CircularProgress, CircularProgressProps, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";

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
          {`${Math.round(props.value)}`}
        </Typography>
        <Typography variant="caption" component="div" color="text.primary">
          SOLVED
        </Typography>
      </Box>
    </Box>
  );
}

export default function UserActivityReport() {
  const [progress, setProgress] = useState(90);

  return (
    <Card
      style={{
        marginTop: "20px",
        padding: "20px",
        paddingTop: "10px",
        minHeight: "270px",
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
          <Box flexDirection="column" sx={{ width: "150px", marginTop: '40px' }}>
            <CircularProgressWithLabel value={progress} />
          </Box>

          <Box
            sx={{
              minWidth: "100px",
              width: "100%",
              paddingLeft: "20px",
              paddingRirth: "20px",
            }}
          >
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
                <Typography color="text.secondary">easy</Typography>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  <Typography color="text.primary">0</Typography>
                  <Typography color="text.secondary">/ 725</Typography>
                  <Typography color="text.secondary">not enough data</Typography>
                </Box>

              </Box>

              <LinearProgress
                variant="determinate"
                value={progress}
                color="success"
              />
            </Box>

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
                <Typography color="text.secondary">medium</Typography>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  <Typography color="text.primary">0</Typography>
                  <Typography color="text.secondary">/ 725</Typography>
                  <Typography color="text.secondary">not enough data</Typography>
                </Box>

              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  backgroundColor: "#FFEECB",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#FFB35A",
                  },
                }}
              />
            </Box>

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
                <Typography color="text.secondary">hard</Typography>
                <Box display="flex" flexDirection="row" justifyContent="space-between" >
                  <Typography color="text.primary">0</Typography>
                  <Typography color="text.secondary">/ 725</Typography>
                  <Typography color="text.secondary">not enough data</Typography>
                </Box>

              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  backgroundColor: "#FDDBDB",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#FD5C5C",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
