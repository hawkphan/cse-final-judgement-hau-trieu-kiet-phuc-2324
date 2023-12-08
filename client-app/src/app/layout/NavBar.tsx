import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

export default function NavBar({ openForm }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item>
          <img
            src="public/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Programmer Island
        </Menu.Item>
        <Menu.Item className="nav-action link" name="Activities" />
        <Menu.Item className="nav-action link" name="Explore" />
        <Menu.Item className="nav-action link" name="Problems" />
        <Menu.Item className="nav-action link" name="Contest" />
        <Menu.Item className="nav-action link" name="Discuss" />
        <Menu.Item className="nav-action link" name="Interview" />
        <Menu.Item className="nav-action link" name="Store" />

        <Menu.Item
          position="right"
          onClick={openForm}
          positive
          hover
        >
          <img
            className="avatar-container"
            src="src/assets/avatar/avatar.png"
            alt=""
          />
          <div>Phan Hau</div>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
