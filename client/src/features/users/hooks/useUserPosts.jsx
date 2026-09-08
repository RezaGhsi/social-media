import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPosts } from "../../posts/api/postApi";

const useUserPosts = (username) => {
  return useInfiniteQuery({
    queryKey: ["posts", "profile"],
    queryFn: async ({ pageParam }) => {
      const { data } = await getUserPosts(username, pageParam);
      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 2 * 60 * 1000,
  });
};
export default useUserPosts;
