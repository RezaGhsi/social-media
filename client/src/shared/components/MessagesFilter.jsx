import { useState } from "react";

const MessagesFilter = () => {
  const [feed, setFeed] = useState("Primary");
  const handleFeedChange = (e) => {
    setFeed(e.target.value);
    console.log(feed);
  };

  const selectedStyles = "border-black font-Poppins-SemiBold";
  const unselectedStyles = "border-white";

  return (
    <>
      <nav className="justify-aro flex w-full text-sm *:flex *:w-full *:justify-center *:border-b-4 *:py-3 *:transition-all *:hover:cursor-pointer">
        <button
          href="#"
          onClick={handleFeedChange}
          value={"Primary"}
          className={`${feed === "Primary" ? selectedStyles : unselectedStyles}`}
        >
          Primary
        </button>
        <button
          href="#"
          onClick={handleFeedChange}
          value={"Requests"}
          className={`${feed === "Requests" ? selectedStyles : unselectedStyles}`}
        >
          Requests
        </button>
      </nav>
    </>
  );
};
export default MessagesFilter;
