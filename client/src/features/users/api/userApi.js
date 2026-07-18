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

export const updateUserAvatar = async (avatarFormData, setUploadProgress) => {
  await await api.post("/auth/refresh");

  return await api.put(`/user/upload/avatar`, avatarFormData, {
    timeout: 20000,
    onUploadProgress: (e) => {
      const uploadProgress = Math.floor(e.progress * 100);
      setUploadProgress(uploadProgress);
    },
  });
};

export const updateUserInfo = async (info) =>
  await api.put(`/user/update/profile`, info);
