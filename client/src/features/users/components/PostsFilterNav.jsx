import { useState } from "react";

const PostsFilterNav = () => {
  const [feed, setFeed] = useState("Posts");
  const handleFeedChange = (e) => {
    setFeed(e.target.value);
    console.log(feed);
  };

  const selectedStyles = "border-purple-800 text-purple-800";
  const unselectedStyles =
    "text-neutral-800 border-neutral-300 hover:text-purple-600";

  return (
    <>
      <nav className="flex w-full justify-between *:hover:cursor-pointer *:font-Poppins-SemiBold *:w-full *:justify-center *:flex *:py-3 *:border-b-4 *:transition-all ">
        <button
          href="#"
          onClick={handleFeedChange}
          value={"Posts"}
          className={`${feed === "Posts" ? selectedStyles : unselectedStyles}`}
        >
          Posts
        </button>
        <button
          href="#"
          onClick={handleFeedChange}
          value={"Reels"}
          className={`${feed === "Reels" ? selectedStyles : unselectedStyles}`}
        >
          Reels
        </button>
        <button
          href="#"
          onClick={handleFeedChange}
          value={"Pictures"}
          className={`${feed === "Pictures" ? selectedStyles : unselectedStyles}`}
        >
          Pictures
        </button>
        <button
          href="#"
          onClick={handleFeedChange}
          value={"Reposts"}
          className={`${feed === "Reposts" ? selectedStyles : unselectedStyles}`}
        >
          Reposts
        </button>
      </nav>
    </>
  );
};
export default PostsFilterNav;
