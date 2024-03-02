/* eslint-disable react-refresh/only-export-components */
import { Breadcrumbs, Typography } from "@mui/material";
import { COLOR_CODE } from "../../../shared";
import { PATHS } from "../../Navbar/helpers";
import { Link } from "react-router-dom";

export const tabsList = [
  {
    label: "Description",
    value: "tab1",
  },
  {
    label: "Submission",
    value: "tab2",
  },
];

export const ProblemBreadcrumbs = ({ problem }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        to={PATHS.problems}
        style={{ textDecoration: "none", color: COLOR_CODE.PRIMARY_300 }}
      >
        <Typography textAlign="center" style={{ textDecoration: "none" }}>
          Problems
        </Typography>
      </Link>
      <Typography color="text.primary">{problem.code}</Typography>
    </Breadcrumbs>
  );
};
