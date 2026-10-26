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
    staleTime: 0,
  });
};
export default useHomeFeed;
