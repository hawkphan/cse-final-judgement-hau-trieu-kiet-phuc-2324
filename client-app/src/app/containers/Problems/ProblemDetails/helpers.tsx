/* eslint-disable react-refresh/only-export-components */
import { PATHS } from "../../Navbar/helpers";

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

export const toBreadcrumbs = ({ problem }) => {
  return [
    {
      id: 0,
      label: 'Problems',
      href: PATHS.problems,
    },
    {
      id: 1,
      label: problem.code,
    },
  ];
}
