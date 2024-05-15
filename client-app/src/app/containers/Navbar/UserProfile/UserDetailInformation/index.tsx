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
  Tooltip,
  Typography,
} from "@mui/material";
import { FaEye, FaCheckCircle, FaStar } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { Button, LoadingCommon, formatDate, isEmpty } from "../../../../shared";
import { useCallback } from "react";
import { API_QUERIES, useGetProfileById } from "../../../../queries";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../../../shared/common/stores/store";
import { getLanguageNameById } from "../../../Problems/ProblemDetails/SubmissionTab/helpers";
import { PATHS } from "../../../../configs/paths";

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

  if (isFetching || isEmpty(id)) {
    return <LoadingCommon />;
  }

  return (
    <Card
      style={{
        marginTop: "20px",
        padding: "20px",
        minWidth: "180px",
      }}
      elevation={4}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ marginTop: "0px", flexGrow: 3, padding: "10px 20px" }}>
          <Stack direction="row" spacing={2} style={{ paddingBottom: "20px" }}>
            <Avatar
              sx={{ width: 180, height: 180 }}
              src={
                profile?.avatar
                  ? "data:image/jpeg;base64," + profile?.avatar
                  : ""
              }
            />

            <Stack
              direction="column"
              spacing={0.5}
              flexGrow={1}
              sx={{ padding: "20px" }}
            >
              <h3>{profile?.displayName}</h3>
              <h3>{profile?.email}</h3>
              <h3>
                <strong>DOB: </strong>
                {formatDate(profile?.birthday)}
              </h3>

              <h3>
                {"Rating: "}
                <Tooltip
                  title="Click to navigate to the ranking table"
                  arrow
                  placement="right"
                >
                  <Link to={PATHS.ranking}>{`${Math.floor(profile?.rating)}`}</Link>
                </Tooltip>
              </h3>
            </Stack>
          </Stack>
          {id == userStore?.user?.id && (
            <Button
              onClick={handleEditProfile}
              style={{
                width: "100%",
                maxHeight: "30px",
                minHeight: "30px",
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ marginRight: "20px" }}
        />

        <Box sx={{ marginTop: "0px", flexGrow: 3 }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            dense
          >
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold" }}
              color="text.primary"
              gutterBottom
            >
              Community Stats
            </Typography>

            <ListItem>
              <ListItemIcon>
                <FaCheckCircle style={{ color: "#8AFF72" }} />
              </ListItemIcon>
              <ListItemText
                primary={`Solutions ${profile?.activities?.solutions}`}
                secondary={`Last week ${profile?.activities?.lastWeekSolutions}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FaEye style={{ color: "blue" }} />
              </ListItemIcon>
              <ListItemText
                primary={`Problems ${profile?.activities?.views}`}
                secondary={`Last week ${profile?.activities?.lastWeekViews}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FaStar style={{ color: "#EBF068" }} />
              </ListItemIcon>
              <ListItemText
                primary={`Solved problems ${profile?.activities?.solvedProblems}`}
                secondary={`Last week ${profile?.activities?.lastWeekSolvedProblems}`}
              />
            </ListItem>
          </List>
        </Box>

        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ marginRight: "20px" }}
        />

        <Box sx={{ marginTop: "0", flexGrow: 3 }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            dense
          >
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold" }}
              color="text.primary"
              gutterBottom
            >
              Languages
            </Typography>
            <Box display="flex" flexDirection="column">
              {profile?.languageUsage === null ? (
                <ListItemText secondary="Not enough data" />
              ) : (
                profile?.languageUsage?.map((language) => (
                  <ListItem key={language}>
                    <ListItemIcon>
                      <TbPointFilled />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${getLanguageNameById(language)}`}
                    />
                  </ListItem>
                ))
              )}
            </Box>
          </List>
        </Box>
      </Box>
    </Card>
  );
};

export default UserDetailInformation;
