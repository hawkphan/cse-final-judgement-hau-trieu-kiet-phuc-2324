import { Stack } from "@mui/material";
import { Button, View } from "../../shared";
import RegisteredListView from "./RegisteredListView";
import UnregisteredListView from "./UnregisteredListView";
import { PATHS } from "../../configs/paths";
import { useNavigate } from "react-router-dom";

const Contests = () => {
  const navigate = useNavigate();
  return (
    <View
      className="timeline"
      id="gantt-timeline"
      style={{ backgroundColor: "white", borderRadius: "10px", padding: "2px" }}
    >
      <Stack direction="row" justifyContent="flex-end" mt={4} pr={2}>
        <Button
          label="Manage"
          onClick={() => navigate(PATHS.contestManagement)}
        />
      </Stack>
      <RegisteredListView />
      <UnregisteredListView />
    </View>
  );
};

export default Contests;
