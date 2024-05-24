import axios from "axios";
import { API_URL } from "../common/constants";
import { Contest, ContestStatistic, CreateContestBody, EditContestBody } from "./types";
import { GetPropertiesParams } from "../Languages";
import { stringify } from "../../shared";

const getRegisteredContests = (params: GetPropertiesParams) => {
  const queryString = stringify(params);
  return axios.get<Contest[]>(
    `${API_URL}/api/contests/registered?${queryString}`,
    {}
  );
};

const getUnregisteredContests = (params: GetPropertiesParams) => {
  const queryString = stringify(params);
  return axios.get<Contest[]>(
    `${API_URL}/api/contests/unregistered?${queryString}`,
    {}
  );
};

const getContests = (params: GetPropertiesParams) => {
  const queryString = stringify(params);
  return axios.get<Contest[]>(`${API_URL}/api/contests?${queryString}`, {});
};

const createContest = (body: CreateContestBody) => {
  return axios.post(`${API_URL}/api/contests`, body, {});
};

const editContest = (body: EditContestBody) => {
  const { id } = body;
  return axios.put(`${API_URL}/api/contests/${id}`, body, {});
};

const getContestById = (params: { id: string }) => {
  return axios.get<Contest>(`${API_URL}/api/contests/${params.id}`, {});
};

const getContestStatisticById = (params: { id: string }) => {
  return axios.get<ContestStatistic>(`${API_URL}/api/charts/contests/${params.id}`, {});
};

const deleteContest = (id: string) => {
  return axios.delete(`${API_URL}/api/contests/${id}`, {});
};

export {
  getRegisteredContests,
  getUnregisteredContests,
  getContests,
  createContest,
  deleteContest,
  editContest,
  getContestById,
  getContestStatisticById
};
