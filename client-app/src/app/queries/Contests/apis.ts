import axios from "axios";
import { API_URL } from "../common/constants";
import { Contest, CreateContestBody, EditContestBody } from "./types";

const getRegisteredContests = () => {
  return axios.get<Contest[]>(`${API_URL}/api/contests/registered`, {});
};

const getUnregisteredContests = () => {
  return axios.get<Contest[]>(`${API_URL}/api/contests/unregistered`, {});
};

const createContest = (body: CreateContestBody) => {
  return axios.post(`${API_URL}/api/contests`, body, {});
};

const editContests = (body: EditContestBody) => {
  const { id } = body;
  return axios.put(`${API_URL}/api/contests/${id}`, body, {});
};

export { getRegisteredContests, getUnregisteredContests, createContest, editContests };
