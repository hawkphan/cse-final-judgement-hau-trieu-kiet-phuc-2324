/* eslint-disable react-refresh/only-export-components */

import { PATHS } from "../../../configs/paths";

export const tabsList = [
  {
    label: "Problems",
    value: "tab1",
  },
  {
    label: "Submit code",
    value: "tab2",
  },
  {
    label: "My Submissions",
    value: "tab3",
  },
  {
    label: "Standings",
    value: "tab4",
  },
];

export const toBreadcrumbs = () => {
  return [
    {
      id: 0,
      label: "Problems",
      href: PATHS.problems,
    }
  ];
};

export enum ThemeMode {
  LIGHT = "light",
  DARK = "vs-dark",
}

export enum Tab {
  PROBLEMS = "tab1",
  SUBMITCODE = "tab2",
  MYSUBMISSIONS = "tab3",
  STANDINGS = "tab4"
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
