import { Container, Stack, Typography } from "@mui/material";
import Table from "../../common/Table";
import { Problem } from "../../models/problem";
import { useEffect, useState } from "react";
import axios from "axios";
const Problems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    axios
      .get<Problem[]>("http://localhost:5000/api/problems")
      .then((response) => {
        setProblems(response.data);
      });
  }, []);

  const columns = [
    { name: "code", label: "CODE NAME", options: { filter: true } },
    { name: "title", label: "Title", options: { filter: true } },
    { name: "Solution", null: "No Solution", options: { filter: true } },
    {
      name: "Acceptance",
      null: "No Submission to estimate",
      label: "Acceptance Rate",
      options: { filter: true },
    },
    { name: "difficulty", label: "Difficulty", options: { filter: true } },
  ];

  return (
    <Container>
      <Stack>
        <Typography variant="h3">Problem Table</Typography>
        <Table columns={columns} data={problems} title="Title nè" />
      </Stack>
    </Container>
  );
};

export default Problems;
