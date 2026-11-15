import { useEffect, useRef, useState } from "react";
import Modal from "../../../shared/components/Modal";
import { useParams } from "react-router-dom";
import { getUserFollowings } from "../api/userApi";
import UserCard from "./UserCard";
import { useAuth } from "../../auth/hooks/useAuth";
import { Loader } from "lucide-react";

const FollowingsModal = ({ isOpen, onClose }) => {
  const { username } = useParams();

  const [loading, setLoading] = useState(true);
  const [followings, setFollowings] = useState(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const getFollowings = async (username) => {
      try {
        const { data } = await getUserFollowings(username);

        setFollowings(data.followings);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) getFollowings(username);
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose(false)} title={"Following's"}>
        <div className="rounded-b-2xl bg-white">
          <hr className="text-neutral-300" />
          {loading ? (
            <Loader />
          ) : (
            <div className="p-3 sm:p-5 w-82 sm:w-120 gap-4 flex flex-col">
              {followings.map((user, i) => {
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
export default FollowingsModal;
