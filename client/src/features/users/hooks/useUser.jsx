import { getUserProfile } from "../api/userApi";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { username } = useParams();

  return useQuery({
    queryKey: ["user", "page", username],
    queryFn: async () => {
      const { data } = await getUserProfile(username);
      return data;
    },
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
};
