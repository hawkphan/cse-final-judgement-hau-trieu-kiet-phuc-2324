import axios from "axios";
import { API_URL, CreateSolutionBody, GetPropertiesParams, Solution } from "..";
import { stringify } from "../../shared";

const getSolutions = (params: GetPropertiesParams) => {
  const queryString = stringify(params);
  return axios.get<Solution[]>(`${API_URL}/api/solutions?${queryString}`, {});
};

const submitSolution = (body: CreateSolutionBody) => {
  return axios.post(`${API_URL}/api/solutions`, body, {});
};


export { getSolutions, submitSolution };
