import axios from "axios";
import { API_URL } from "../common/constants";
import { stringify } from "../../shared";
import { Notification } from "./types";
import { GetPropertiesParams } from "..";

const getNotifications = (params: GetPropertiesParams) => {
  const queryString = stringify(params);
  return axios.get<Notification[]>(
    `${API_URL}/api/notifications?${queryString}`,
    {}
  );
};

export { getNotifications };
