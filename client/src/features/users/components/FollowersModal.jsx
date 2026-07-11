import { useEffect, useRef, useState } from "react";
import Modal from "../../../shared/components/layout/Modal";
import { useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { getUserFollowers } from "../api/userApi";
import UserCard from "./UserCard";

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
      <Modal isOpen={isOpen} onClose={() => onClose(false)} title={"Following"}>
        <div className="bg-white rounded-b-2xl p-2 px-5">
          <hr className="mb-3 text-neutral-300" />
          {loading ? (
            <FaSpinner />
          ) : (
            followers.map((user, i) => {
              return (
                <UserCard
                  name={user.name}
                  username={user.username}
                  avatarUrl={user.avatarUrl}
                  key={i}
                />
              );
            })
          )}
        </div>
      </Modal>
    </>
  );
};
export default FollowersModal;
