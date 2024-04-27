/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

export interface Profile {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  isFemale?: boolean;
  displayName?: string;
}
export interface EditProfileBody {
  get?: any;
  id?: string;
  userId?: string;
  description?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  displayName?: string;
  email?: string;
  birthday?: string;
  gender?: number;
}

export interface LanguagesUsage {
  languagedId?: number;
  totalSubmission?: number;
}

export interface InMonthSubmissions {
  year: number;
  month: number;
  totalSubmission: number;
}

export interface ProblemStatistic<T> {
  totalProblems: number;
  totalSolvedProblems: number;
  difficultyStatistics : T[];
}

export interface DifficultyStatistic {
  difficulty: number;
  totalProblems: number;
  totalSolved: number;
}
