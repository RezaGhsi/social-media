import api from "./../../../lib/axiosInstance";

export const upload = async (formData, setUploadProgress) => {
  await await api.post("/auth/refresh");

  return await api.post("/post/upload", formData, {
    timeout: 3000000,
    onUploadProgress: (e) => {
      const uploadProgress = Math.floor(e.progress * 100);
      setUploadProgress(uploadProgress);
    },
  });
};

export const likePost = async (postId) => await api.post("/like", postId);

export const disLikePost = async (postId) =>
  await api.delete("/like", { data: postId });

export const savePost = async (postId) => await api.post(`/save/${postId}`);

export const unSavePost = async (postId) => await api.delete(`/save/${postId}`);

export const getSavedPosts = async () => await api.get(`/save`);

export const deletePost = async (postId) => await api.delete(`/post/${postId}`);

export const getHomePagePosts = async () => await api.get(`/post`);

export const getUserPosts = async (username, cursor) =>
  await api.get(`/post/user/${username}`, { params: { cursor } });
