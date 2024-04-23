import axios from "axios";
import { DifficultyStatistic, EditProfileBody, InMonthSubmissions, LanguagesUsage, Profile, SubmissionStatistic } from "./types";
import { API_URL } from "../common/constants";


const editProfile = (body: EditProfileBody) => {
  return axios.put(`${API_URL}/api/profile/editProfile`, body, {});
};

const getProfileById = (params: { id: string }) => {
  return axios.get<Profile>(`${API_URL}/api/profile/${params.id}`,
    {}
  );
};

const getLanguagesUsageById = (params: {id: string}) => {

  return axios.get<LanguagesUsage[]>(`${API_URL}/api/chart/languages-chart/${params.id}`,{});
}

const getAnnualSubmissionById = (params: {id: string}) => {
  return axios.get<InMonthSubmissions[]>(`${API_URL}/api/chart/annual-chart/${params.id}`,{});
}

const getSubmissionStatisticById = (params: {id: string}) => {
  return axios.get<SubmissionStatistic<DifficultyStatistic>>(`${API_URL}/api/chart/statistic-chart/${params.id}`,{});
}

export {  getProfileById, editProfile, getLanguagesUsageById, getAnnualSubmissionById, getSubmissionStatisticById  };
