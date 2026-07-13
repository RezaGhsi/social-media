import { useState } from "react";
import { followUser, unFollowUser } from "../../features/users/api/userApi";
import { toast } from "sonner";

const FollowUnfollowBtn = ({
  className = "",
  isFollowing = false,
  username,
}) => {
  const [followLoading, setFollowLoading] = useState(false);
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  const handleFollow = () => {
    const followRequest = async (username) => {
      try {
        const { data } = await followUser(username);
        setIsFollowingState(true);
        toast.success(data.message, {
          style: { background: "green", color: "white" },
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    const unFollowRequest = async (username) => {
      try {
        const { data } = await unFollowUser(username);
        setIsFollowingState(false);
        toast.success(data.message, {
          style: { background: "green", color: "white" },
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    setFollowLoading(true);
    isFollowingState ? unFollowRequest(username) : followRequest(username);
    setFollowLoading(false);
  };
  return (
    <>
      <button
        disabled={followLoading}
        onClick={handleFollow}
        className={`font-Poppins-Medium border-cyan-700 border-2 p-3 w-28 rounded-full hover:cursor-pointer hover:bg-cyan-700 hover:text-white ${isFollowingState ? "text-white bg-cyan-600" : "text-cyan-700"} ${className}`}
      >
        {isFollowingState ? "Unfollow" : "Follow"}
      </button>
    </>
  );
};
export default FollowUnfollowBtn;
