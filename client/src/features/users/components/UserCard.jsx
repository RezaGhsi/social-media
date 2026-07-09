import { MdVerified } from "react-icons/md";
import FollowUnfollowBtn from "../../../shared/components/FollowUnfollowBtn";
const UserCard = ({ imageSrc, name, username, isVerified = false }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <a href={`/${username}`}>
          <img
            src={imageSrc}
            alt={name}
            className="w-16 h-16 object-cover rounded-full"
          />
        </a>
        <div className="flex flex-col ml-2 justify-between mr-2 ">
          <div className="flex items-center mb-1 text-xl w-[12dvw]">
            <a
              href={`/${username}`}
              className="font-Poppins-Medium mr-2 truncate "
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
      <FollowUnfollowBtn />
    </div>
  );
};
export default UserCard;
