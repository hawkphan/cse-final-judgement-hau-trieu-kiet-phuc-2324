import { useState } from "react";
import {
  Container,
  Divider,
  Grid,
  Menu,
  Segment,
  Tab,
  Accordion,
  Icon,
  Dropdown,
  Button,
  Form,
  TextArea,
  Rating,
} from "semantic-ui-react";

interface Props {}

export default function ProblemDecription_Page() {
  const [accorionSelected, setAccorionSelected] = useState(-1);
  const [languageSelected, setLanguageSelected] = useState("C#");

  const panes = [
    {
      menuItem: "Description",
      render: () => <Tab.Pane attached={false}>Description</Tab.Pane>,
    },
    {
      menuItem: "Editorial",
      render: () => <Tab.Pane attached={false}>Editorial</Tab.Pane>,
    },
    {
      menuItem: "Solutions",
      render: () => <Tab.Pane attached={false}>Solutions ({})</Tab.Pane>,
    },
    {
      menuItem: "Submissions",
      render: () => <Tab.Pane attached={false}>Submissions</Tab.Pane>,
    },
  ];
  const Languages = ["C#", "Java", "Python"];
  return (
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          <div>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            <Segment>
              <Container>
                <Grid>
                  <Grid.Row columns={3}>
                    <Grid.Column>
                      <p>Accepted: {} |</p>
                    </Grid.Column>

                    <Grid.Column>
                      <p>Submissions: {} |</p>
                    </Grid.Column>

                    <Grid.Column>
                      <p>Acceptance rate: {}</p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>

              <Divider />

              <Container>
                <p>Questions</p>
                <Divider />

                <Accordion>
                  <Accordion.Title
                    active={accorionSelected === 0}
                    index={0}
                    onClick={() => setAccorionSelected(0)}
                  >
                    <Icon name="dropdown" />
                    Discusions ({})
                  </Accordion.Title>
                  <Accordion.Content active={accorionSelected === 0}>
                    <p>
                      A dog is a type of domesticated animal. Known for its
                      loyalty and faithfulness, it can be found as a welcome
                      guest in many households across the world.
                    </p>
                  </Accordion.Content>

                  <Divider />

                  <Accordion.Title
                    active={accorionSelected === 1}
                    index={1}
                    onClick={() => setAccorionSelected(1)}
                  >
                    <Icon name="dropdown" />
                    Related topic ({})
                  </Accordion.Title>
                  <Accordion.Content active={accorionSelected === 1}>
                    <p>
                      There are many breeds of dogs. Each breed varies in size
                      and temperament. Owners often select a breed of dog that
                      they find to be compatible with their own lifestyle and
                      desires from a companion.
                    </p>
                  </Accordion.Content>
                </Accordion>
              </Container>
            </Segment>
          </div>
        </Grid.Column>

        <Grid.Column>
          <Segment clearing>
            <Menu secondary>
              <Dropdown text={languageSelected}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="C#"
                    onClick={() => setLanguageSelected("C#")}
                  ></Dropdown.Item>
                  <Dropdown.Item
                    text="Java"
                    onClick={() => setLanguageSelected("Java")}
                  ></Dropdown.Item>
                  <Dropdown.Item
                    text="Python"
                    onClick={() => setLanguageSelected("Python")}
                  ></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Menu.Menu position="right">
                <Button icon="bookmark outline" />
                <Button icon="undo" />
                <Button icon="settings" />
                <Button icon="expand" />
              </Menu.Menu>
            </Menu>
            <Form>
              <TextArea placeholder="Coding here" style={{ minHeight: 400 }} />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
