import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { FaRegCalendarCheck, FaRegCheckSquare } from "react-icons/fa";
import { VscCommentDiscussion } from "react-icons/vsc";
import { IoIosArrowForward } from "react-icons/io";

export default function UserSubmission() {
  return (
    <Card
      style={{
        marginTop: "15px",
        paddingLeft: '20px',
        paddingRight: '20px',
        minHeight: "300px",
        minWidth: "180px",
      }}
      elevation={4}
    >
      <CardContent>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Button
              variant="text"
              startIcon={<FaRegCalendarCheck />}
              style={{ color: "black" }}
            >
              Recent AC
            </Button>
            <Button
              variant="text"
              startIcon={<FaRegCheckSquare />}
              style={{ color: "black" }}
            >
              Solutions
            </Button>
            <Button
              variant="text"
              startIcon={<VscCommentDiscussion />}
              style={{ color: "black" }}
            >
              Discuss
            </Button>
          </Box>
          <Box>
            <Button
              variant="text"
              endIcon={<IoIosArrowForward />}
              style={{ color: "black", fontWeight: "lighter"}}
            >
                <Typography sx={{ mb: 1.5, marginTop: '10px' }} color="text.secondary">View all submissions</Typography>              
            </Button>
          </Box>
        </Box>

        <Box display="flex" flexDirection="row">
          <Box flexDirection="column" sx={{ width: "80%" }}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              No recent Submissions
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
