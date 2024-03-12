import axios from "axios";
import { API_URL } from "../common/constants";
import { stringify } from "../../shared";
import { CreateProblemBody, EditProblemBody, Problem } from "./types";
import { GetPropertiesParams } from "..";

const createProblem = (body: CreateProblemBody) => {
  return axios.post(`${API_URL}/api/problems`, body, {});
};

const editProblem = (body: EditProblemBody) => {
  const id = body.get('id');
  return axios.put(`${API_URL}/api/problems/${id}`, body, {});
};

const getProblems = (params: GetPropertiesParams) => {
  const queryString = stringify(params);
  return axios.get<Problem[]>(`${API_URL}/api/problems?${queryString}`, {});
};

const getProblemById = (params: { id: string }) => {
  return axios.get<Problem>(`${API_URL}/api/problems/${params.id}`,
    {}
  );
};

const deleteProblem = (id: string) => {
  return axios.delete(`${API_URL}/api/problems/${id}`, {});
};

export { getProblems, getProblemById, createProblem, editProblem, deleteProblem };
