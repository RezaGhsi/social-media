import { Loader } from "lucide-react";
import useInfiniteScroll from "../../../shared/hooks/useInfiniteScroll";
import usePostComments from "../hooks/usePostComments";
import CommentCard from "./CommentCard";

const CommentsList = ({ postId }) => {
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
  } = usePostComments(postId);

  const sentinelRef = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    { enabled: hasNextPage },
  );

  const comments = data?.pages.flatMap((p) => p.comments) ?? [];

  return (
    <div className="w-132 rounded-b-lg p-4 py-8">
      <h4 className="font-Poppins-Medium mb-3">Comments</h4>

      {isLoading && (
        <div className="font-Poppins-SemiBold flex h-20 items-center justify-center gap-3">
          <Loader className="size-10 animate-spin" />
        </div>
      )}

      {!isLoading && comments?.length < 1 ? (
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-white">
          <h4 className="font-Poppins-Bold text-xl text-neutral-800">
            No Comments Yet
          </h4>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-4">
          {comments?.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
          {hasNextPage && (
            <div
              className="bg[#f1f1f1] flex w-full items-center justify-center"
              ref={sentinelRef}
            >
              {isFetchingNextPage ? (
                <div className="font-Poppins-SemiBold flex h-40 items-center gap-3">
                  <Loader className="size-10 animate-spin" />
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CommentsList;
