import { Problem, User } from "../Problems";

export interface Contest {
  id: string;
  code: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  hasStarted?: boolean;
  numOfMembers?: number;
  members: User[];
  problems: Problem[];
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
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  members: User[];
  problems: Problem[];
}
export interface ContestProblem {
  problemId: string;
  score: number;
}

export interface ContestMember {
  userId: string;
  role: number;
}
