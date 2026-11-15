import { useState } from "react";
import { Bookmark, Heart, MessageCircle, BookmarkCheck } from "lucide-react";
import AvatarImg from "../../users/components/AvatarImg";
import {
  likePost,
  disLikePost,
  savePost,
  unSavePost,
  deletePost,
} from "../api/postApi";
import ErrorToast from "../../../shared/components/ErrorToast";
import SuccessToast from "../../../shared/components/SuccessToast";
import PostOptionsMenu from "./PostOptionsMenu";
import CommentModal from "../../comments/components/CommentModal";
import { useAuth } from "../../auth/hooks/useAuth";

const PostCard = ({ post, user, isOwnPage = false, mini = false, className = "" }) => {
  const baseURL = import.meta.env.VITE_STATIC_BASE_URL;

  const { user: selfUser } = useAuth();

  const [liked, setLiked] = useState(post?.isLikedByUser);
  const [likesCount, setLikesCount] = useState(post?.likesCount);
  const [commentsCount, setCommentsCount] = useState(post?.commentsCount);
  const [saved, setSaved] = useState(post?.isSavedByUser);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleLike = () => {
    const submitLike = async (postId) => {
      try {
        if (liked) {
          setLiked(false);
          await disLikePost({ postId });
          setLikesCount(likesCount - 1);
        } else {
          setLiked(true);
          await likePost({ postId });
          setLikesCount(likesCount + 1);
        }
      } catch (error) {
        setLiked(post?.isLikedByUser || false);
        ErrorToast(error.response.data.message);
      }
    };
    submitLike(post._id);
  };

  const closeCommentsModal = () => {
    setIsCommentsOpen(false);
  };

  const handleSave = () => {
    const submitSave = async (postId) => {
      try {
        if (saved) {
          setSaved(false);
          await unSavePost(postId);
          SuccessToast("unSaved Post Successfully");
        } else {
          setSaved(true);
          await savePost(postId);
          SuccessToast("Saved Post Successfully");
        }
      } catch (error) {
        setSaved(post?.isSavedByUser || false);
        ErrorToast(error.response.data.message);
      }
    };
    submitSave(post._id);
  };

  const handleRemovePost = () => {
    const submitDeletePost = async (postId) => {
      try {
        const { data } = await deletePost(postId);
        SuccessToast(data.message);
        setTimeout(() => window.location.reload(), 500);
      } catch (error) {
        ErrorToast(error.response.data.message);
      }
    };
    submitDeletePost(post._id);
  };

  return (
    <div
      className={`relative flex max-w-155 flex-col rounded-2xl bg-white ${className}`}
    >
      <div className={`flex justify-between border-2 border-neutral-200 border-b-0 rounded-t-2xl ${mini ? "p-3" : "p-5"}`}>
        <div className="flex items-center gap-2.5">
          <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white">
            <AvatarImg avatarUrl={user.avatarUrl} />
          </div>
          <div className="flex flex-col">
            <a
              href={`/${user.username}`}
              className={`font-Poppins-Medium ${mini ? "text-lg" : "text-xl"}`}
            >
              {user.name}
            </a>
            <a href={`/${user.username}`} className="text-xs text-neutral-500">
              @{user.username}
            </a>
          </div>
        </div>

        {isOwnPage && <PostOptionsMenu handleRemovePost={handleRemovePost} />}
      </div>
      <div className="flex w-full overflow-hidden flex-col ">
        <img
          src={`${baseURL}/${post?.mediaUrl}`}
          alt="post image"
          className={`w-full object-cover ${mini ? "" : ""}`}
          loading="lazy"
        />

        <div className="border-2 border-neutral-200 p-5 flex flex-col gap-3 border-t-0 rounded-b-2xl">

          <div className="flex justify-between text-2xl text-[26px]">
            <div className="flex items-center gap-4">
              <button onClick={handleLike} className="cursor-pointer flex gap-1.5">
                {liked ? (
                  <div className="relative">
                    <Heart
                      size={24}
                      fill="red"
                      className="absolute animate-ping text-red-600 [animation-iteration-count:1]"
                    />
                    <Heart size={24} fill="red" className="text-red-600" />
                  </div>
                ) : (
                  <Heart size={24} className="text-violet-600" />
                )}
                <span className="text-lg font-Poppins-Medium">{likesCount}</span>
              </button>
              <button onClick={() => setIsCommentsOpen(!isCommentsOpen)} className="cursor-pointer flex gap-1.5">
                <MessageCircle size={24} />
                <CommentModal
                  postId={post._id}
                  isOpen={isCommentsOpen}
                  onClose={closeCommentsModal}
                />
                <span className="text-lg text-neutral-500">{commentsCount}</span>
              </button>
            </div>
            <button onClick={handleSave} className="cursor-pointer">
              {saved ? (
                <div className="relative">

                  <BookmarkCheck size={24} />
                </div>
              ) : (
                <Bookmark size={24} />
              )}
            </button>
          </div>
          <div className="">
            <p className={`mb-3 ${mini ? "line-clamp-2" : ""}`}>{post.description}</p>
            <div>
              {post.hashtags?.map((hashtag, i) => (
                <a
                  key={i}
                  href={`hashtag/${hashtag}`}
                  className="mr-1 text-blue-500 text-sm"
                >
                  #{hashtag}
                </a>
              ))}
            </div>
          </div>
          <p
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className={`cursor-pointer text-neutral-400 text-sm ${mini ? "hidden" : "visible"}`}
          >
            View all {commentsCount} comments...
          </p>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
