import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void
}

export default function ActivitityDashboard({
  // activities,
  // selectedActivity,
  // selectActivity,
  // cancelSelectActivity,
  // openForm,
  // closeForm,editMode,createOrEdit, deleteActivity
}: Props) {
  return (
  <>
  </>
  );
}
