import { useState } from "react";
import { Bookmark, Heart, MessageCircleMore, Check } from "lucide-react";
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

const PostCard = ({ post, user, isOwnPage = false, className = "" }) => {
  const baseURL = import.meta.env.VITE_STATIC_BASE_URL;

  const [liked, setLiked] = useState(post?.isLikedByUser);
  const [likesCount, setLikesCount] = useState(post?.likesCount);
  const [saved, setSaved] = useState(post?.isSavedByUser);

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
      className={`relative flex w-full flex-col rounded-lg p-2 ${className}`}
    >
      <div className="mt-2 mb-2 flex justify-between">
        <div className="flex items-center gap-2">
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white">
            <AvatarImg avatarUrl={user.avatarUrl} />
          </div>
          <div className="flex flex-col">
            <a
              href={`/${user.username}`}
              className="font-Poppins-Medium mb-1 text-xl"
            >
              {user.name}
            </a>
            <a href={`/${user.username}`} className="text-sm">
              @{user.username}
            </a>
          </div>
        </div>

        {isOwnPage && <PostOptionsMenu handleRemovePost={handleRemovePost} />}
      </div>
      <div className="flex w-full flex-col p-1">
        <img
          src={`${baseURL}/${post?.mediaUrl}`}
          alt="post image"
          className="w-full rounded-xl"
        />
        <div className="m-3 mt-5 flex gap-3 text-2xl text-[26px] *:cursor-pointer">
          <button onClick={handleLike}>
            {liked ? (
              <div className="relative">
                <Heart
                  size={30}
                  fill="red"
                  className="absolute animate-ping text-red-600 [animation-iteration-count:1]"
                />
                <Heart size={30} fill="red" className="text-red-600" />
              </div>
            ) : (
              <Heart size={30} />
            )}
          </button>
          <button>
            <MessageCircleMore size={30} />
          </button>
          <button onClick={handleSave}>
            {saved ? (
              <div className="relative">
                <Check
                  size={16}
                  className="absolute inset-0 place-self-center text-white"
                />
                <Bookmark size={30} fill="black" />
              </div>
            ) : (
              <Bookmark size={30} />
            )}
          </button>
        </div>
        <div className="font-Poppins-Medium ml-2 text-neutral-700">
          <p className="mb-3 *:text-black">
            Liked by <span>{likesCount}</span> users
          </p>
          <p className="mb-3">{post.description}</p>
          <div>
            {post.hashtags?.map((hashtag, i) => (
              <a
                key={i}
                href={`hashtag/${hashtag}`}
                className="mr-1 text-blue-500"
              >
                #{hashtag}
              </a>
            ))}
          </div>
          <a href="#" className="text-neutral-400">
            View all 24 comments ...
          </a>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
