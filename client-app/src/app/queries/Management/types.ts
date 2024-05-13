export interface DataStatistic {
  times: string[];
  values: number[];
}

export interface OveralStatistic {
  solutionStatistic?: SolutionSubmitedStatistic;
  processingSubmissions?: number;
  inQueueSubmissions?: number;
  totalProblems?: number;
  thisMonthCreatedProblems?: number;
  totalContests?: number;
  thisMonthStartContests?: number;
}

export interface SolutionSubmitedStatistic {
  todayAccepted?: number;
  todayRejected?: number;
  thisMonthAccepted?: number;
  thisMonthRejected?: number;
  thisYearAccepted?: number;
  thisYearRejected?: number;
}
