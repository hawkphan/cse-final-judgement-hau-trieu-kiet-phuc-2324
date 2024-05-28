import { Problem, User } from "../Problems";
import { LanguagesUsage } from "../Profiles";

export interface Contest {
  id?: string;
  name?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  rule?: number;
  type?: number;
  problems?: ContestProblem[];
  members?: ContestMember[];
}

export interface CreateContestBody {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  rule: number;
  type: number;
  problems: ContestProblem[];
  members: ContestMember[];
}

export interface EditContestBody {
  id?: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  rule: number;
  type: number;
  problems: ContestProblem[];
  members: ContestMember[];
}
export interface ContestProblem {
  problemId?: string;
  problem?: Problem;
  score?: number;
  code?: string;
  title?: string;
  order?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  problemLanguages?: any;
  gradeMode?: string;
  approximateRate?: string;
}

export interface ContestMember {
  userId?: string;
  role?: number;
  user?: User;
}

export interface ContestStatistic {
  contestId: string;
  totalCandidates: number;
  totalSubmissions: number;
  problemSubmissionsStatistic: ProblemSubmissionStatistic[];
  languagesUsageStatistic?: LanguagesUsage[];
}

export interface ProblemSubmissionStatistic {
  problemId: string;
  totalSubmissions: number;
  submissionStatus?: SubmissionStatus;
  languagesUsage?: LanguagesUsage[];
}

export interface SubmissionStatus {
  accepted: number;
  wrongAnswer: number;
  timeLimitExceeded: number;
  compileError: number;
  internalError: number;
  execFormatError: number;
  runtimeErrorSIGSEGV: number;
  runtimeErrorSIGXFSZ: number;
  runtimeErrorSIGFPE: number;
  runtimeErrorSIGABRT: number;
  runtimeErrorNZEC: number;
  runtimeErrorOther: number;
}

export interface RankingMember {
  userId: string;
  userName: string;
  rank: number;
  score: number;
  solvedProblemCount: number;
  totalTime: number;
  problems: RankingProblem[];
}

export interface RankingProblem {
  problemId: string;
  problemName: string;
  status: number;
  score: number;
  order: number;
  submissionCount: number;
  timeSpent: number;
}
