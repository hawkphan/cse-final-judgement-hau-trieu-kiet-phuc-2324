import axios from "axios";
import { DataStatistic, OverallStatistic } from "./types";
import { API_URL } from "../common/constants";

const getOverallStatistic = () => {
  return axios.get<OverallStatistic>(`${API_URL}/api/management/overall-statistic`, {});
};

const getSolutionsStatistic = (params: string ) => {
  return axios.get<DataStatistic>(
    `${API_URL}/api/management/solutions-statistic?dateString=${params}`,
    {}
  );
};

const getProblemsStatistic = (params: string ) => {
  return axios.get<DataStatistic>(
    `${API_URL}/api/management/problems-statistic?dateString=${params}`,
    {}
  );
};

export { getOverallStatistic, getSolutionsStatistic, getProblemsStatistic };
