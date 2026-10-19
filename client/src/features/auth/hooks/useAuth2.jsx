import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getMeRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  changePassRequest,
} from "../api/authApi";

export const useAuth2 = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await getMeRequest();
      return data;
    },
    retry: false,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await loginRequest(credentials);
      return data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await registerRequest(credentials);
      return data;
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutRequest,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
};
