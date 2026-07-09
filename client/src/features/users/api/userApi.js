import api from "./../../../lib/axiosInstance";

export const getUserProfile = async (username) =>
  await api.get(`/user/${username}`);

export const followUser = async (username) =>
  await api.post(`/follow/${username}`);

export const unFollowUser = async (username) =>
  await api.delete(`/follow/${username}`);

export const getUserFollowings = async (username) =>
  await api.get(`/user/${username}/followings`);

export const getUserFollowers = async (username) =>
  await api.get(`/user/${username}/followers`);
