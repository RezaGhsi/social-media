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
        className={`font-Poppins-Medium w-28 rounded-full border-2 border-cyan-700 p-3 hover:cursor-pointer hover:bg-cyan-700 hover:text-white ${isFollowingState ? "bg-cyan-600 text-white" : "text-cyan-700"} ${className}`}
      >
        {isFollowingState ? "Unfollow" : "Follow"}
      </button>
    </>
  );
};
export default FollowUnfollowBtn;
