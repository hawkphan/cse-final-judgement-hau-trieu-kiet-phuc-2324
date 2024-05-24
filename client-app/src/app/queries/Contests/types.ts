import { Problem } from "../Problems";

/* eslint-disable @typescript-eslint/no-explicit-any */
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
  problemLanguages?: any;
  gradeMode?: string;
  approximateRate?: string;
}

export interface ContestMember {
  userId: string;
  role: number;
}
