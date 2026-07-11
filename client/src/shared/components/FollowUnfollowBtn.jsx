const FollowUnfollowBtn = ({
  className = "",
  isFollowed = false,
  handleFollow,
  disabled = false,
}) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={handleFollow}
        className={`font-Poppins-Medium border-cyan-700 border-2 p-3 w-28 rounded-full hover:cursor-pointer hover:bg-cyan-700 hover:text-white ${isFollowed ? "text-white bg-cyan-600" : "text-cyan-700"} ${className}`}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </>
  );
};
export default FollowUnfollowBtn;
