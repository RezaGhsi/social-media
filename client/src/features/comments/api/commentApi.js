import api from "./../../../lib/axiosInstance";

export const newComment = async (text, postId) =>
  await api.post("/comment", { text, postId });

export const getComments = async (postId, cursor) =>
  await api.get(`/comment/post/${postId}`, { params: { cursor } });
