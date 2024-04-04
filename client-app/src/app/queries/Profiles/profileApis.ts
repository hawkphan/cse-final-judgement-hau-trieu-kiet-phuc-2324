import axios from "axios";
import { EditProfileBody, Profile } from "./types";
import { API_URL } from "../common/constants";


const editProfile = (body: EditProfileBody) => {
  return axios.put(`${API_URL}/api/profile/editProfile`, body, {});
};

const getProfileById = (params: { id: string }) => {
  return axios.get<Profile>(`${API_URL}/api/profile/${params.id}`,
    {}
  );
};

export {  getProfileById, editProfile  };
