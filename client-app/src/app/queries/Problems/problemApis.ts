import axios from "axios";
import { API_URL } from "../common/constants";
import { stringify } from "../../shared";
import { GetPropertiesParams, Problem } from "./types";

const getProblems = (params: GetPropertiesParams) => {
  const queryString = stringify(params);
  return axios.get<Problem[]>(`${API_URL}/api/problems?${queryString}`, {});
};

const getProblemById = (params: { id: string }) => {
  return axios.get<Problem>(`${API_URL}/api/problems/${params.id}`,
    {}
  );
};

export { getProblems, getProblemById };
