export interface DataStatistic {
  times: string[];
  values: number[];
}

export interface OveralStatistic {
  solutionStatistic?: SolutionSubmitedStatistic;
  userLogInStatistic?: UserLogInStatistic;
  processingSubmissions?: number;
  inQueueSubmissions?: number;
  totalProblems?: number;
  thisMonthCreatedProblems?: number;
}

export interface SolutionSubmitedStatistic {
  todayAccepted?: number;
  todayRejected?: number;
  thisMonthAccepted?: number;
  thisMonthRejected?: number;
  thisYearAccepted?: number;
  thisYearRejected?: number;
}

export interface UserLogInStatistic {
  totalUser?: number;
  loggingIn?: number;
  loggingOut?: number;
}
