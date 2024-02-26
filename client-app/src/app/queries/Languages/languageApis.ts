import axios from "axios";
import { API_URL } from "../common/constants";
import { Language } from "./types";

const getLanguages = () => {
  return axios.get<Language[]>(`${API_URL}/api/languages`, {});
};

export { getLanguages };
