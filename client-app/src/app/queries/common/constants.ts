export const API_URL = "http://localhost:5000";

export enum API_QUERIES {
  // Problems
  GET_PROBLEMS = "/get-problems",
  GET_PROBLEM_BY_ID = "/get-problem-by-id",

  // Languages
  GET_LANGUAGES = "/get-languages",

  // User profile
  GET_PROFILE_BY_ID = "/get-profile-by-id",

  // Solutions
  GET_SOLUTIONS = "/get-solutions",

  // Results
  GET_RESULTS = "/get-results",

  // Contests
  GET_REGISTERED_CONTEST = "/get-register-contests",
  GET_UNREGISTERED_CONTEST = "/get-unregistered-contests"
}
