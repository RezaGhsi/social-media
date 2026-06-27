import { MdVerified } from "react-icons/md";
import FollowUnfollowBtn from "../../../shared/components/FollowUnfollowBtn";
const UserSuggestCard = ({ imageSrc, name, username, isVerified = false }) => {
  console.log(imageSrc);
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <a href={`/${username}`}>
          <img src={imageSrc} alt={name} className="w-18 rounded-full" />
        </a>
        <div className="flex flex-col ml-4 justify-between mr-2 ">
          <div className="flex items-center mb-1 text-xl">
            <a href={`/${username}`} className="font-Poppins-Medium mr-2">
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
export default UserSuggestCard;
