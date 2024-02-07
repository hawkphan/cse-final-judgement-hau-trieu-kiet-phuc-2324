
import { UploadFileType } from "../../shared";
import { Table2Params } from "../common/types";

export interface Problem {
  id?: string;
  code?: string;
  title?: string;
  difficulty?: string;
  description?: string;
  date?: string;
  userId?: string;
  testCasesFiles?: UploadFileType[];
}

export type GetPropertiesParams = Table2Params & {
  [key: string]: string | number | string[];
};
