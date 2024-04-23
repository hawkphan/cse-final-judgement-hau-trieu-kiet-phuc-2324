export const API_URL = "http://localhost:5000";

export enum API_QUERIES {
  // Problems
  GET_PROBLEMS = "/get-problems",
  GET_PROBLEM_BY_ID = "/get-problem-by-id",

  // Languages
  GET_LANGUAGES = "/get-languages",

  // User profile
  GET_PROFILE_BY_ID = "/get-profile-by-id",
  GET_LANGUAGES_CHART_BY_ID = "/get-languages-usage-chart-by-id",
  GET_ANNUAL_CHART_BY_ID = "/get-annual-chart-by-id",
  GET_SUBMISSIONS_CHART_BY_ID = "/get-submission-chart-by-id",

  // Solutions
  GET_SOLUTIONS = "/get-solutions",

  // Results
  GET_RESULTS = "/get-results",

  // Contests
  GET_REGISTERED_CONTEST = "/get-register-contests",
  GET_UNREGISTERED_CONTEST = "/get-unregistered-contests"
}
