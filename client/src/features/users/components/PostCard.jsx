import { useState } from "react";
import { FaRegHeart, FaRegCommentDots, FaHeart } from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";

const PostCard = ({ post, avatar }) => {
  const baseURL = import.meta.env.VITE_STATIC_BASE_URL;

  const [liked, setLiked] = useState(false);
  const handleLike = (e) => {
    liked ? setLiked(false) : setLiked(true);
  };
  return (
    <div className="flex w-full relative rounded-lg p-3 pt-4">
      <img
        src={`${baseURL}/${avatar}`}
        alt="Profile pic"
        className="absolute rounded-full object-cover h-22 w-22 border-2 border-white "
      />
      <div className="flex flex-col ml-22 p-2 w-full">
        <span className="font-Poppins-Medium text-xl mb-4">Lena Mc'Queen</span>
        <img
          src={`${baseURL}/${post?.mediaUrl}`}
          alt="post image"
          className="w-full rounded-xl"
        />
        <div className="flex m-3 mt-5 *:mr-4 text-2xl *:cursor-pointer">
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
        <div className="ml-2 font-Poppins-Medium text-neutral-700">
          <p className="*:text-black mb-3">
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
