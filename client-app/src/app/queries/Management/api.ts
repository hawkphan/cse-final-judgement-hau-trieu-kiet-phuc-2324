import axios from "axios";
import { DataStatistic, OveralStatistic } from "./types";
import { API_URL } from "../common/constants";

const getOveralStatistic = () => {
  return axios.get<OveralStatistic>(`${API_URL}/api/management/overal-statistic`, {});
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

export { getOveralStatistic, getSolutionsStatistic, getProblemsStatistic };
