import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../api/commentApi";

const usePostComments = (postId) => {
  return useInfiniteQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: async ({ pageParam }) => {
      try {
        const { data } = await getComments(postId, pageParam);
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
export default usePostComments;
