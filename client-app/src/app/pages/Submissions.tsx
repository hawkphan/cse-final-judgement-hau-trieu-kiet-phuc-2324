import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activities: Activity[];
  
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    deleteActivity: (id: string) => void
  
  }
export default function SubmissionsPage ({ activities}: Props){
    return(
        <Segment>
        <Item.Group divided>
          {activities.map((activity) => (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city},{activity.venue}
                  </div>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    );
}