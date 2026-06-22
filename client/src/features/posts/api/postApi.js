import api from "./../../../lib/axiosInstance";

export const upload = async (formData) =>
  await api.post("/post/upload", formData);
