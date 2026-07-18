import { useState } from "react";
import { FaRegHeart, FaRegCommentDots, FaHeart } from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";

const PostCard = ({ post, avatar, name }) => {
  const baseURL = import.meta.env.VITE_STATIC_BASE_URL;

  const [liked, setLiked] = useState(false);
  const handleLike = (e) => {
    liked ? setLiked(false) : setLiked(true);
  };
  return (
    <div className="relative flex w-full rounded-lg p-3 pt-4">
      <img
        src={`${baseURL}/${avatar}`}
        alt="Profile pic"
        className="absolute h-22 w-22 rounded-full border-2 border-white object-cover"
      />
      <div className="ml-22 flex w-full flex-col p-2">
        <span className="font-Poppins-Medium mb-4 text-xl">{name}</span>
        <img
          src={`${baseURL}/${post?.mediaUrl}`}
          alt="post image"
          className="w-full rounded-xl"
        />
        <div className="m-3 mt-5 flex text-2xl *:mr-4 *:cursor-pointer">
          <button onClick={handleLike}>
            {liked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
          </button>
          <button>
            <FaRegCommentDots />
          </button>
          <button>
            <MdOutlineShare />
          </button>
        </div>
        <div className="font-Poppins-Medium ml-2 text-neutral-700">
          <p className="mb-3 *:text-black">
            Liked by <a href="/rad_front">rad_front</a> and <span>2923</span>{" "}
            others
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
            View all 294 comments ...
          </a>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
