import { MdVerified } from "react-icons/md";
import FollowUnfollowBtn from "../../../shared/components/FollowUnfollowBtn";
const UserCard = ({
  avatarUrl,
  name,
  username,
  isFollowing,
  isVerified = false,
}) => {
  const baseURL = import.meta.env.VITE_STATIC_BASE_URL;

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <a href={`/${username}`}>
          <img
            src={`${baseURL}/${avatarUrl || "images/default-profile-pic.png"}`}
            alt={name}
            className="h-16 min-w-16 rounded-full object-cover"
          />
        </a>
        <div className="mr-2 ml-2 flex flex-col justify-between">
          <div className="mb-1 flex w-[12dvw] items-center text-xl">
            <a
              href={`/${username}`}
              className="font-Poppins-Medium mr-2 truncate"
            >
              {name}
            </a>
            <span>
              {isVerified && <MdVerified className="text-blue-600" />}
            </span>
          </div>
          <a href={`/${username}`} className="text-sm">
            @{username}
          </a>
        </div>
      </div>
      <FollowUnfollowBtn isFollowing={isFollowing} username={username} />
    </div>
  );
};
export default UserCard;
