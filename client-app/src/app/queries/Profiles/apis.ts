import axios from "axios";
import {
  DifficultyStatistic,
  EditProfileBody,
  InMonthSubmissions,
  LanguagesUsage,
  Profile,
  ProblemStatistic,
} from "./types";
import { API_URL } from "../common/constants";
import { GetPropertiesParams } from "../Languages";
import { stringify } from "../../shared";

const getProfiles = (params: GetPropertiesParams) => {
  const queryString = stringify(params);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return axios.get<Profile<any>[]>(`${API_URL}/api/profiles?${queryString}`, {});
};

const editProfile = (body: EditProfileBody) => {
  return axios.put(`${API_URL}/api/profiles/editProfile`, body, {});
};

const getProfileById = (params: { id: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return axios.get<Profile<any>>(`${API_URL}/api/profiles/${params.id}`, {});
};

const getLanguagesUsageById = (params: { id: string }) => {
  return axios.get<LanguagesUsage[]>(
    `${API_URL}/api/charts/languages-chart/${params.id}`,
    {}
  );
};

const getAnnualSubmissionById = (params: { id: string }) => {
  return axios.get<InMonthSubmissions[]>(
    `${API_URL}/api/charts/annual-chart/${params.id}`,
    {}
  );
};

const getProblemStatisticById = (params: { id: string }) => {
  return axios.get<ProblemStatistic<DifficultyStatistic>>(
    `${API_URL}/api/charts/statistic-chart/${params.id}`,
    {}
  );
};

export {
  getProfiles,
  getProfileById,
  editProfile,
  getLanguagesUsageById,
  getAnnualSubmissionById,
  getProblemStatisticById,
};
