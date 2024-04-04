import {
  Avatar,
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FaEye, FaCheckCircle, FaStar } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import { profileInfo } from "../TestData/data.mock";
import { Button, LoadingCommon, formatDate, isEmpty } from "../../../../shared";
import { useGetProfileById } from "../../../../queries/Profiles";
import { useCallback } from "react";
import { API_QUERIES } from "../../../../queries";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../../shared/common/stores/store";
export interface Profile {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  gender?: number;
  displayName?: string;
}

interface Props {
  id: string;
}

export const UserDetailInformation = ({ id }: Props) => {
  const navigate = useNavigate();
  const { userStore } = useStore();

  const { profile, isFetching } = useGetProfileById({
    id,
    queryKey: [API_QUERIES.GET_PROFILE_BY_ID, { id: id }],
  });

  const handleEditProfile = useCallback(() => {
    navigate(`/profile/edit`);
  }, [navigate]);

  if (isFetching && isEmpty(id)) {
    return <LoadingCommon />;
  }

  return (
    <Card
      style={{
        marginTop: "20px",
        padding: "20px",
        minHeight: "800px",
        minWidth: "180px",
      }}
      elevation={4}
    >
      <Stack direction="row" spacing={2} style={{ paddingBottom: "20px" }}>
        <Avatar sx={{ width: 80, height: 80 }} />
        
        <Stack direction="column" spacing={0.5}>
          <h4>{profile?.displayName}</h4>
          <h5>{profile?.email}</h5>
          <h5>{formatDate(profile?.birthday)}</h5>
        </Stack>
      </Stack>
      {id == userStore?.user?.id && (
        <Button
          onClick={handleEditProfile}
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
      )}
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
          <ListItemText
            primary={`Views ${profileInfo.user.userProfile.views}`}
            secondary="Last week 0"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FaCheckCircle style={{ color: "#8AFF72" }} />
          </ListItemIcon>
          <ListItemText
            primary={`Solutions ${profileInfo.user.userProfile.solutions}`}
            secondary="Last week 0"
          />
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
          <ListItemText
            primary={`Reputation ${profileInfo.user.userProfile.reputation}`}
            secondary="Last week 0"
          />
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
        <Box display="flex" flexDirection="column">
          {profileInfo.user.userProfile.languagesUsage === null ? (
            <ListItemText secondary="Not enough data" />
          ) : (
            profileInfo.user.userProfile.languages.map((language) => (
              <ListItem key={language}>
                <ListItemIcon>
                  <TbPointFilled />
                </ListItemIcon>
                <ListItemText primary={`${language}`} />
              </ListItem>
            ))
          )}
        </Box>
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
};

export default UserDetailInformation;
