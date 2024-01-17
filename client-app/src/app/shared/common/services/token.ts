/* eslint-disable @typescript-eslint/no-explicit-any */

const LOCAL_STORAGE_TOKEN = "guest_token";

const clearToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
};

const getToken = () => null;

const forceRefreshToken = async () =>
  null;

export default {
  clearToken,
  getToken,
  forceRefreshToken,
};
