import { View } from "../../shared";
import RegisteredListView from "./RegisteredListView";
import UnregisteredListView from "./UnregisteredListView";

const Contests = () => {
  return (
    <View
      className="timeline"
      id="gantt-timeline"
      style={{ backgroundColor: "white", borderRadius: "10px", padding: "2px" }}
    >
      <RegisteredListView />
      <UnregisteredListView />
    </View>
  );
};

export default Contests;
