/* eslint-disable react-refresh/only-export-components */

import { PATHS } from "../../../configs/paths";

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
      label: "Problems",
      href: PATHS.problems,
    },
    {
      id: 1,
      label: problem.code,
    },
  ];
};

export enum ThemeMode {
  LIGHT = "light",
  DARK = "vs-dark",
}

export enum Tab {
  DESCRIPTION = "tab1",
  SUBMISSION = "tab2",
  OTHER = "tab3",
}

export const CompilerEnv = {
  JavaScript: {
    name: "script.js",
    language: "javascript",
    value: "",
  },
  Python: {
    name: "main.py",
    language: "python",
    value: "",
  },
  Java: {
    name: "Main.java",
    language: "java",
    value: "",
  },
};
