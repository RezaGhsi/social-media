import api from "./../../../lib/axiosInstance";

export const upload = async (formData) =>
  await api.post("/post/upload", formData);

export const likePost = async (postId) => await api.post("/like", postId);

export const disLikePost = async (postId) =>
  await api.delete("/like", { data: postId });

export const savePost = async (postId) => {
  console.log(postId);
  return await api.post(`/save/${postId}`);
};

export const unSavePost = async (postId) => await api.delete(`/save/${postId}`);

export const getSavedPosts = async () => await api.get(`/save`);
