import { useInfiniteQuery } from "@tanstack/react-query";
import { getHomePagePosts } from "../../features/posts/api/postApi";

const useHomeFeed = () => {
  return useInfiniteQuery({
    queryKey: ["posts", "feed"],
    queryFn: async ({ pageParam }) => {
      const { data } = await getHomePagePosts(pageParam);
      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 2 * 60 * 1000,
  });
};
export default useHomeFeed;
