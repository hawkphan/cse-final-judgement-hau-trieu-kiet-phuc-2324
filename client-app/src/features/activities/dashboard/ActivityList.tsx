import React from "react";
import { Activity } from "../../../app/models/activity";
interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  //cancelSelectActivity: () => void;
  deleteActivity: (id: string) => void;
}
export default function ActivityList({
  // activities,
  // selectActivity,
  // deleteActivity,
}: Props) {
  return <></>;
}
