import axios from "axios";
import { API_URL } from "../common/constants";
import { Contest } from "./types";

const getRegisteredContests = () => {
  return axios.get<Contest[]>(`${API_URL}/api/contests/registered`, {});
};

const getUnregisteredContests = () => {
  return axios.get<Contest[]>(`${API_URL}/api/contests/unregistered`, {});
};

export { getRegisteredContests, getUnregisteredContests };
