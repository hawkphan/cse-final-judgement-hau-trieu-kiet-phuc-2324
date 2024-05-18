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
  problemId: string;
  score: number;
  code?: string;
  title?: string;
}

export interface ContestMember {
  userId: string;
  role: number;
}
