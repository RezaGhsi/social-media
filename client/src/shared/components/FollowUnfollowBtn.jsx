const FollowUnfollowBtn = ({ className = "", isFollowed = false }) => {
  return (
    <>
      <button
        className={`font-Poppins-Medium border-cyan-700 border-2 p-3 w-28 rounded-full hover:cursor-pointer ${isFollowed ? "text-white bg-cyan-600" : "text-cyan-700"} ${className}`}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </>
  );
};
export default FollowUnfollowBtn;
