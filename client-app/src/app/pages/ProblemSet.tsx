import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { purple, red, yellow } from "@mui/material/colors";

import { Problem, Difficulty } from "../models/problem";
import {
  tagSearchOptions,
  searchQuery,
  mockProblemList,
  listSortOptions,
  diffitcultyFilter,
  value,
} from "../mock/MockProblems";
import React, { useState } from "react";
import { Grid, Select, SelectChangeEvent } from "@mui/material";
interface Props {
  problems: Problem[];
}
const getDifficultyColorClass = (difficulty: string): any => {
  switch (difficulty) {
    case "easy":
      return "success";
    case "medium":
      return "primary";
    case "hard":
      return "error";
    default:
      return "white";
  }
};

export default function ProblemSet({ problems }: Props) {
  const [list, setList] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setList(event.target.value as string);
  };
  return (
    <>
      <Grid container columnSpacing={0}>
        <Grid item xs={3}>
          <Box sx={{ maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">List</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue="10"
                value={list}
                label="All"
                onChange={handleChange}
              >
                <MenuItem value={10}>All</MenuItem>
                <MenuItem value={20}>
                  Confirmed Company Interview Question
                </MenuItem>
                <MenuItem value={30}>Easy Problem for Algorithm</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue="10"
                value={difficulty}
                label="All"
                onChange={handleDifficultyChange}
              >
                {diffitcultyFilter.map((difficulty) => (
                  <MenuItem value={difficulty.value}>
                    {difficulty.text}
                  </MenuItem>
                ))};
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center">Difficulty</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="center">Acceptance Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockProblemList.map((problem) => (
              <TableRow
                key={problem.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {problem.title}
                </TableCell>
                <TableCell align="left">{problem.description}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color={getDifficultyColorClass(problem.difficulty)}
                  >
                    {problem.difficulty}
                  </Button>
                </TableCell>
                <TableCell align="left">{problem.status}</TableCell>
                <TableCell align="center">{problem.acceptance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
