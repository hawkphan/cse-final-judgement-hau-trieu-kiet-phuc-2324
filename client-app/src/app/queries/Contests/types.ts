import { Problem, User } from "../Problems";


export interface Contest {
  id: string;
  code: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  hasStarted?: boolean;
  numOfMembers?: number;
  members: User[];
  problems: Problem[];
}

export interface CreateContestBody {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  members: string[];
  problemIds: string[];
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
