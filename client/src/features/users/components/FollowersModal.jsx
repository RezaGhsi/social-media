import { useEffect, useRef, useState } from "react";
import Modal from "../../../shared/components/Modal";
import { useParams } from "react-router-dom";
import { getUserFollowers } from "../api/userApi";
import UserCard from "./UserCard";
import { Loader } from "lucide-react";

const FollowersModal = ({ isOpen, onClose }) => {
  const { username } = useParams();

  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const getFollowers = async (username) => {
      try {
        const { data } = await getUserFollowers(username);
        setFollowers(data.followers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) getFollowers(username);
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose(false)} title={"Follower's"}>
        <div className="rounded-b-2xl max-w-120 bg-white">
          <hr className="text-neutral-300" />
          {loading ? (
            <Loader />
          ) : (
            <div className="p-3 sm:p-5 w-82 sm:w-120 gap-4 flex flex-col">
              {followers.map((user, i) => {
                return (
                  <UserCard
                    name={user.name}
                    username={user.username}
                    avatarUrl={user.avatarUrl}
                    isFollowing={user.isFollowing}
                    key={i}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
export default FollowersModal;
