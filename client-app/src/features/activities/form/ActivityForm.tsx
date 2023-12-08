import React, { ChangeEvent, useState } from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Form, Segment } from "semantic-ui-react";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}
export default function ActivityForm({
  activity: selectedActivity,
  closeForm,
  createOrEdit,
}: Props) {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };
  const [activity, setActivity] = useState(initialState);
  function handleSubmit() {
    createOrEdit(activity);
  }
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }
  return (
    <Segment clearing>
      <div className="user-infomation" style={{ margin: "10px 0 0 10px" }}>
        <img src="src/assets/avatar/avatar.png" alt="" />
        <p className="" style={{ fontSize: "24px" }}>
          FangTriggerXtreme1
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
        <div>
          <img src="../../src/assets/folder-icon.png" alt="" />
        </div>
        <div>
          <img src="../../src/assets/folder-icon.png" alt="" />
        </div>
        <div>
          <img src="../../src/assets/folder-icon.png" alt="" />
        </div>
        <div>
          <img src="../../src/assets/folder-icon.png" alt="" />
        </div>
      </div>
      <br />
      <Button
        onClick={closeForm}
        floated="right"
        positive
        type="button"
        content="Cancel"
      />
    </Segment>
  );
}
