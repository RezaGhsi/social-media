import { useState } from "react";
import { FaRegHeart, FaRegCommentDots, FaHeart } from "react-icons/fa";
import AvatarImg from "./AvatarImg";
import {
  likePost,
  disLikePost,
  savePost,
  unSavePost,
} from "../../posts/api/postApi";
import ErrorToast from "../../../shared/components/ErrorToast";
import { LuBookmark } from "react-icons/lu";
import { IoIosCheckmark } from "react-icons/io";
import SuccessToast from "../../../shared/components/SuccessToast";

const PostCard = ({ post, avatar, name }) => {
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

  return (
    <div className="relative flex w-full rounded-lg p-3 pt-4">
      <div className="absolute h-22 w-22 overflow-hidden rounded-full border-2 border-white">
        <AvatarImg avatarUrl={avatar} />
      </div>
      <div className="ml-22 flex w-full flex-col p-2">
        <span className="font-Poppins-Medium mb-4 text-xl">{name}</span>
        <img
          src={`${baseURL}/${post?.mediaUrl}`}
          alt="post image"
          className="w-full rounded-xl"
        />
        <div className="m-3 mt-5 flex text-2xl text-[26px] *:mr-4 *:cursor-pointer">
          <button onClick={handleLike}>
            {liked ? (
              <div className="relative">
                <FaHeart className="absolute animate-ping text-red-600 [animation-iteration-count:1]" />
                <FaHeart className="text-red-600" />
              </div>
            ) : (
              <FaRegHeart />
            )}
          </button>
          <button>
            <FaRegCommentDots />
          </button>
          <button onClick={handleSave}>
            {saved ? (
              <div className="relative flex items-baseline justify-center">
                <IoIosCheckmark className="absolute text-2xl text-white" />
                <LuBookmark fill="black" />
              </div>
            ) : (
              <LuBookmark />
            )}
          </button>
        </div>
        <div className="font-Poppins-Medium ml-2 text-neutral-700">
          <p className="mb-3 *:text-black">
            Liked by <span>{likesCount}</span> users
          </p>
          <p className="mb-3">{post.description}</p>
          <div>
            {post.hashtags.map((hashtag, i) => (
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
