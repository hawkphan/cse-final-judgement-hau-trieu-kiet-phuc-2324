import { Container, Menu } from "semantic-ui-react";

export default function CustomFooter({}) {
  return (
    <Menu inverted fixed="bottom">
      <Container>
        <Menu.Item>Programmer Island &#169;</Menu.Item>
        <Menu.Item className="nav-action link" name="Help Center" />
        <Menu.Item className="nav-action link" name="Jobs" />
        <Menu.Item className="nav-action link" name="Bug Bounty" />
        <Menu.Item className="nav-action link" name="Online Interview" />
        <Menu.Item className="nav-action link" name="Students" />
        <Menu.Item className="nav-action link" name="Terms" />
        <Menu.Item className="nav-action link" name="Privacy Policy" />
      </Container>
    </Menu>
  );
}
