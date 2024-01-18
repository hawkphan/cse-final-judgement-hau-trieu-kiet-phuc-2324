import { Box, Card, CardContent, Typography } from "@mui/material";

export default function UserAcchivements() {
  return (
    <Card
      style={{
        marginTop: "20px",
        padding: '20px',
        paddingTop: '10px',
        minHeight: "200px",
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
          Badges
        </Typography>
        <Box display="flex" flexDirection="row">
          <Box flexDirection="column" sx={{ width: "80%" }}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              0
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ mb: 1.5 }} color="text.primary">
              adjective
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
