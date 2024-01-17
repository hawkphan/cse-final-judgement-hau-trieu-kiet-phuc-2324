import { Container, Stack, Typography } from "@mui/material";
import Table from "../../common/Table";

const Problems = () => {
  const columns = [
    { name: "Status", options: { filter: true } },
    { name: "Title", options: { filter: true } },
    { name: "Solution", options: { filter: true } },
    { name: "Acceptance", options: { filter: true } },
    { name: "Difficulty", options: { filter: true } },

  ];

  const data = [
    ["X", "2225. Find Players With Zero or One Losses", "Document", "71.6", "Medium"],
    ["X", "2. Add Two Numbers", "Video", "71.6", "Medium"],
    ["X", "1. Two Sum", "Video", "71.6", "Medium"],
    ["X", "3. Jump jump", "Video", "71.6", "Hard"],
    ["X", "5", "Logging", "71.6", "Easy"],
    ["X", "32. Binary Search", "Document", "71.6", "Medium"],
    ["X", "11. Potions", "Document", "71.6", "Medium"],
    ["X", "22", "Document", "71.6", "Medium"],
    ["X", "2225. Find Players With Zero or One Losses", "Document", "71.6", "Medium"],
    
  ];

  return (
    <Container>
      <Stack>
        <Typography variant="h3">Problem Table</Typography>
        <Table columns={columns} data={data} title="Title nè" />
      </Stack>
    </Container>
  );
};

export default Problems;
