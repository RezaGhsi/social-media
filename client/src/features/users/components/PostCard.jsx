import { useState } from "react";
import { FaRegHeart, FaRegCommentDots, FaHeart } from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";

const PostCard = (post) => {
  const [liked, setLiked] = useState(false);
  const handleLike = (e) => {
    liked ? setLiked(false) : setLiked(true);
  };
  return (
    <div className="flex w-full rounded-lg p-3 pt-4">
      <img
        src="images/profile-1.jpg"
        alt="Profile pic"
        className="rounded-full h-22 w-22 border-2 border-white "
      />
      <div className="flex flex-col ml-1 p-2 w-full">
        <span className="font-Poppins-Medium text-xl mb-4">Lena Mc'Queen</span>
        <img
          src="images/feed-4.jpg"
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
          <p className="mb-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias
            quos atque non odit veritatis labore, totam, minima fuga officiis
            voluptates ratione omnis magnam officia quaerat delectus autem.
            Omnis, impedit magni? Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Eius numquam ab, fuga, quas alias accusantium.
            ❤️🔥
          </p>
          <a href="#" className="text-neutral-400">
            View all 294 comments ...
          </a>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
