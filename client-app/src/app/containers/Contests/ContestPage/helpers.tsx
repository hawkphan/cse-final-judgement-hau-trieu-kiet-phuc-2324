import { ContestProblem, Problem } from "../../../queries";
import { PATHS } from "../../../configs/paths";
import { Props } from "react-apexcharts";

export const getTabList = (isAdmin: boolean) => {
  if (!isAdmin) {
    return [
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
  } else {
    return [
      {
        label: "Monitoring",
        value: "tab5",
      },
      {
        label: "Problems",
        value: "tab1",
      },
      {
        label: "Submissions",
        value: "tab3",
      },
      {
        label: "Standings",
        value: "tab4",
      },
    ];
  }
};

export const toBreadcrumbs = () => {
  return [
    {
      id: 0,
      label: "Problems",
      href: PATHS.problems,
    },
  ];
};

export enum ThemeMode {
  LIGHT = "light",
  DARK = "vs-dark",
}

export enum Tab {
  PROBLEMS = "tab1",
  SUBMIT_CODE = "tab2",
  MY_SUBMISSIONS = "tab3",
  STANDINGS = "tab4",
  MONITORING = "tab5",
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
export enum ProblemFilterQueryKey {
  DIFFICULTY = "difficulty",
  FROM_DATE = "fromDate",
  TO_DATE = "toDate",
  KEYWORDS = "keywords",
}

export interface ProblemTabProp {
  problems: ContestProblem[];
  onSetProblemList: (problem: Problem) => void;
  problemList: Problem[];
}

export interface ProblemDetailProp {
  id?: string;
  problemList: Problem[];
  onSetProblem?: (problem: Problem) => void;
}

export const ApexEmptyProp: Props = {
  options: {},
  series: [],
};
