import { useEffect } from "react";
import AvatarImg from "../../users/components/AvatarImg";

const CommentCard = ({ comment }) => {
  useEffect(() => {}, []);

  return (
    <article className="mb-4 flex w-full flex-col rounded-lg border-2 border-neutral-300 bg-[#f1f1f1] p-5">
      <div className="flex items-center gap-3">
        <a className="h-10 w-10 cursor-pointer overflow-hidden rounded-full">
          <AvatarImg avatarUrl={comment?.user.avatarUrl} />
        </a>
        <div className="flex flex-col gap-0.5">
          <a
            href={`/${comment.user.username}`}
            className="font-Poppins-Medium text-sm"
          >
            {comment?.user.name}
          </a>
          <span className="font-Poppins-Medium text-xs text-neutral-400">
            {comment.createdAt}
          </span>
        </div>
      </div>
      <p className="font-Poppins-Medium ml-3 w-full p-5 pb-0">{comment.text}</p>
    </article>
  );
};
export default CommentCard;
