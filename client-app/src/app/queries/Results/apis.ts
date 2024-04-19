import axios from "axios";
import { API_URL } from "../common/constants";
import { stringify } from "../../shared";
import { GetPropertiesParams } from "../Languages";
import { Result } from "./types";

const getResults = (params: GetPropertiesParams) => {
  
  const queryString = stringify(params);
  return axios.get<Result[]>(`${API_URL}/api/results?${queryString}`, {});
};

export { getResults };
