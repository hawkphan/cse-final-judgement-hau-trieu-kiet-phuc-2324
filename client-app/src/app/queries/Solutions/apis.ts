import axios from "axios";
import { API_URL, GetPropertiesParams, Solution } from "..";
import { stringify } from "../../shared";

const getSolutions = (params: GetPropertiesParams) => {
  const queryString = stringify(params);
  return axios.get<Solution[]>(`${API_URL}/api/solutions?${queryString}`, {});
};

export { getSolutions };
