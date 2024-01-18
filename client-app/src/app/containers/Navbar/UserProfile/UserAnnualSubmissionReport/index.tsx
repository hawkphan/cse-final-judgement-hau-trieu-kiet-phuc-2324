import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { ImNotification } from "react-icons/im";

export default function UserAnnualReport() {
  return (
    <Card
      style={{
        marginTop: "15px",
        paddingLeft: "20px",
        paddingRight: "20px",
        minHeight: "300px",
        minWidth: "180px",
      }}
      elevation={4}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ marginTop: "10px" }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              sx={{ mb: 1.5, paddingRight: "5px" }}
              color="text.primary"
            >
              0
            </Typography>
            <Typography
              sx={{ mb: 1.5, paddingRight: "5px" }}
              color="text.secondary"
            >
              submissions in last year
            </Typography>
            <ImNotification style={{ marginTop: "6px" }} />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography
                sx={{ mb: 1.5, paddingRight: "10px" }}
                color="text.secondary"
              >
                Total active days:
              </Typography>
              <Typography
                sx={{ mb: 1.5, paddingRight: "20px" }}
                color="text.primary"
              >
                0
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography
                sx={{ mb: 1.5, paddingRight: "10px" }}
                color="text.secondary"
              >
                Max streak:
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.primary"
              >
                0
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display="flex" flexDirection="row">
          <Box flexDirection="column" sx={{ width: "80%" }}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              not enough data
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
