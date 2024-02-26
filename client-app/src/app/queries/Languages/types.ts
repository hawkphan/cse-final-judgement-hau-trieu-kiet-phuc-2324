import { Table2Params } from "../common/types";

export interface Language {
  id?: string;
  name?: string;
  runCommands?: string[];
  AppUserId?: string;
}

export interface LanguageOption {
  label: string;
  value: string;
}

export type GetPropertiesParams = Table2Params & {
  [key: string]: string | number | string[];
};
