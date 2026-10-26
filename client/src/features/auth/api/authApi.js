import api from "../../../lib/axiosInstance";

export const getMeRequest = async () => await api.get("/auth/me");

export const registerRequest = async (credentials) =>
  await api.post("/auth/register", credentials);

export const loginRequest = async (credentials) =>
  await api.post("/auth/login", credentials);

export const logoutRequest = async () => await api.post("/auth/logout");

export const changePassRequest = async (passwordForm) =>
  await api.put("/auth/password", passwordForm);
