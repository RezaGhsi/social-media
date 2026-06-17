import api from "../../../lib/axiosInstance";

export const getMeRequest = async () => {
  const { data } = api.get("/auth/me");
  return data;
};

export const registerRequest = async (credentials) => {
  const { data } = api.post("/auth/register", credentials);
  return data;
};
