import {
  Avatar,
  Button,
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { VscAccount } from "react-icons/vsc";
import { FaEye, FaCheckCircle, FaStar } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";

//User Detail Information box contain the user basic information, includes:
//Basic info:           Avatar, username, id, rank, option to edit profile
//Activity tracking:    Views, Solution, Disscuss, Reputation
//Languages used:       java, c, c+, c++, c#,...
//Skill: ?
export default function UserDetailInformation() {
  return (
    <Card
      style={{
        marginTop: "20px",
        padding: '20px',
        minHeight: "200px",
        minWidth: "180px",
      }}
      elevation={4}
    >
      <Stack direction="row" spacing={2} style={{ paddingBottom: "20px" }}>
        <Avatar sx={{ width: 80, height: 80 }}>
          <VscAccount />
        </Avatar>

        <Stack direction="column" spacing={0.5}>
          <h4>Hoang Trieu Le</h4>
          <h5>user53183</h5>
          <h5>Rank ~ 5,000,000</h5>
        </Stack>
      </Stack>
      <Button
        variant="outlined"
        color="success"
        style={{
          width: "100%",
          maxWidth: "500px",
          maxHeight: "30px",
          minWidth: "100px",
          minHeight: "30px",
        }}
      >
        Edit Profile
      </Button>

      <Divider style={{ marginTop: "20px", marginBottom: "5px" }} />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        dense
      >
        <Typography
          sx={{ fontSize: 16, fontWeight: "bold" }}
          color="text.primary"
          gutterBottom
        >
          Community Stats
        </Typography>
        <ListItem>
          <ListItemIcon>
            <FaEye style={{ color: "blue" }} />
          </ListItemIcon>
          <ListItemText primary="Views 0" secondary="Last week 0" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FaCheckCircle style={{ color: "#8AFF72" }} />
          </ListItemIcon>
          <ListItemText primary="Solutions 0" secondary="Last week 0" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <IoChatboxEllipsesOutline style={{ color: "#61B350" }} />
          </ListItemIcon>
          <ListItemText primary="Discuss 0" secondary="Last week 0" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <FaStar style={{ color: "#EBF068" }} />
          </ListItemIcon>
          <ListItemText primary="Reputation 0" secondary="Last week 0" />
        </ListItem>
      </List>

      <Divider style={{ marginTop: "20px", marginBottom: "5px" }} />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        dense
      >
        <Typography
          sx={{ fontSize: 16, fontWeight: "bold" }}
          color="text.primary"
          gutterBottom
        >
          Languages
        </Typography>
        <ListItem>
          <ListItemText secondary="Not enough data" />
        </ListItem>
      </List>
      <Divider style={{ marginTop: "20px", marginBottom: "5px" }} />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        dense
      >
        <Typography
          sx={{ fontSize: 16, fontWeight: "bold" }}
          color="text.primary"
          gutterBottom
        >
          Skills
        </Typography>
        <ListItem>
          <ListItemIcon>
            <TbPointFilled style={{ color: "red" }} />
          </ListItemIcon>
          <ListItemText primary="Advanced" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <TbPointFilled style={{ color: "orange" }} />
          </ListItemIcon>
          <ListItemText primary="Intermediate" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <TbPointFilled style={{ color: "green" }} />
          </ListItemIcon>
          <ListItemText primary="Fundamental" />
        </ListItem>
      </List>
    </Card>
  );
}
