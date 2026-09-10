import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPosts } from "../../posts/api/postApi";

const useUserPosts = (username) => {
  return useInfiniteQuery({
    queryKey: ["posts", "profile"],
    queryFn: async ({ pageParam }) => {
      try {
        const { data } = await getUserPosts(username, pageParam);
        return data;
      } catch (error) {
        if (error.response?.status === 403) {
          const privateError = new Error("This Account is Private");
          privateError.status = 403;
          throw privateError;
        }
        throw error;
      }
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 2 * 60 * 1000,
  });
};
export default useUserPosts;
