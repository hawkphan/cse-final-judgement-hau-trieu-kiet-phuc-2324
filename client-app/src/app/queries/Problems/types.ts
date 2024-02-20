/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table2Params } from "../common/types";

export interface Problem {
  id?: string;
  code?: string;
  title?: string;
  difficulty?: number;
  description?: string;
  date?: string;
  userId?: string;
  testCasesFiles?: any;
}

export type GetPropertiesParams = Table2Params & {
  [key: string]: string | number | string[];
};
