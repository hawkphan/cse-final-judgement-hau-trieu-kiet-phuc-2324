import axios from "axios";
import { EditProfileBody, Profile } from "./types";
import { API_URL } from "../common/constants";


const editProfile = (body: EditProfileBody) => {
  const id = body.get('id');
  return axios.put(`${API_URL}/api/account/EditProfile/${id}`, body, {});
};


const getProfileById = (params: { id: string }) => {
  console.log("getProfileById " + params.id)
  return axios.get<Profile>(`${API_URL}/api/profile/${params.id}`,
    {}
  );
};


export {  getProfileById, editProfile  };
