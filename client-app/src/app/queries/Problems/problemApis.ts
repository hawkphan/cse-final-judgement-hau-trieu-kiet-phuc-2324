import axios from "axios";
import { API_URL } from "../common/constants";
import { stringify } from "../../shared";
import { TableParamsNet } from "../common/types";
import { Problem } from "./types";

const getProblems = (params: TableParamsNet) => {
  const queryString = stringify(params);
  return axios.get<Problem[]>(`${API_URL}/api/problems?${queryString}`, {});
};

export { getProblems };
