import { Problem } from "../../models/problem";
import { User } from "../Profiles";

export interface Contest {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
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
