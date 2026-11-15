import FollowUnfollowBtn from "../../../shared/components/FollowUnfollowBtn";
import { BadgeCheck } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import AvatarImg from "./AvatarImg";
const UserCard = ({
  avatarUrl,
  name,
  username,
  isFollowing,
  isVerified = false,
}) => {
  const baseURL = import.meta.env.VITE_STATIC_BASE_URL;
  const { user } = useAuth();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-2 w-full items-center">
        <a href={`/${username}`} className="h-12 w-12 rounded-full overflow-hidden">
          <AvatarImg avatarUrl={avatarUrl} />
        </a>
        <div className="flex flex-col flex-1 shrink justify-between">
          <div className="flex items-center ">
            <a
              href={`/${username}`}
              className="font-Poppins-Medium text-lg truncate sm:w-full w-38 "
            >
              {name}
            </a>
            <span>
              {isVerified && (
                <BadgeCheck size={26} fill="blue" className="text-white" />
              )}
            </span>
          </div>
          <a href={`/${username}`} className="text-xs text-neutral-500 truncate">
            @{username}
          </a>
        </div>
      </div>
      {user.username !== username && (
        <FollowUnfollowBtn isFollowing={isFollowing} username={username} />
      )}
    </div>
  );
};
export default UserCard;
