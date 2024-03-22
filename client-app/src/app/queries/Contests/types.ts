import { Problem } from "../../models/problem";
import { User } from "../Profiles";

export interface Contest {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  members: User[];
  Problems: Problem[];
}
