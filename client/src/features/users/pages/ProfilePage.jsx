import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { BsGlobe2 } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { PiCameraSlashBold } from "react-icons/pi";
import { MdLockOutline } from "react-icons/md";

import UserCard from "../components/UserCard";
import Hashtag from "../../../shared/components/Hashtag";
import PostsFilterNav from "../components/PostsFilterNav";
import VerificationError from "../../../shared/components/VerificationError";
import FollowUnfollowBtn from "../../../shared/components/FollowUnfollowBtn";
import PostCard from "../components/PostCard";
import NotFound from "../../../pages/NotFound";

import { useAuth } from "../../auth/hooks/useAuth";
import { getUserProfile, followUser, unFollowUser } from "../api/userApi";
import FollowingsModal from "../components/FollowingsModal";
import FollowersModal from "../components/FollowersModal";

const ProfilePage = () => {
  const baseURL = import.meta.env.VITE_STATIC_BASE_URL;

  const [userPageInfo, setUserPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [isFollowingsModalOpen, setIsFollowingsModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);

  const { user } = useAuth();

  const { username } = useParams();

  useEffect(() => {
    const getUser = async (username) => {
      try {
        const { data } = await getUserProfile(username);
        setUserPageInfo(data.user);
        setIsFollowing(data.user.isFollowing);
      } catch (error) {
        setError(error);
        setUserPageInfo(error.response.data.user);
      } finally {
        setLoading(false);
      }
    };
    getUser(username);
  }, []);

  const handleFollow = () => {
    const followRequest = async (username) => {
      try {
        const { data } = await followUser(username);
        setIsFollowing(true);
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
        setIsFollowing(false);
        toast.success(data.message, {
          style: { background: "green", color: "white" },
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    setFollowLoading(true);
    isFollowing ? unFollowRequest(username) : followRequest(username);
    setFollowLoading(false);
  };

  if (error) return <NotFound />;

  return (
    <div className="w-[dvw] h-auto flex  justify-center bg-gray-500/15 pt-8 px-10 ">
      {loading ? (
        <FaSpinner />
      ) : (
        <main className="flex flex-col w-[69dvw] rounded-lg mr-4 *:bg-white items-center *:mb-4 ">
          <section className="w-full rounded-t-lg">
            <div className="relative h-[30dvh] w-full overflow-hidden rounded-t-lg">
              <img
                src="images/feed-6.jpg"
                alt="Banner Image"
                className="w-full h-full object-cover object-center "
              />
            </div>

            <img
              src={`${baseURL}/${userPageInfo.avatarUrl || "images/default-profile-pic.png"}`}
              alt="Profile pic"
              className="absolute z-20 w-38 h-38 object-cover rounded-full ml-8 -mt-19 border-2 border-white"
            />
            <div className="flex justify-between">
              <div className="pt-24 ml-8 w-[36dvw] ">
                <h1 className="font-Poppins-ExtraBold text-2xl">
                  {userPageInfo.name}
                </h1>
                <span className="font-Poppins-Medium">
                  @{userPageInfo.username}
                </span>
                <p className="text-xl mt-6 mb-6 font-Poppins-Medium">
                  {userPageInfo.biography || ""}
                </p>
                <span className="flex items-center text-neutral-700 mb-6">
                  <BsGlobe2 />
                  <a
                    href="https://sabzlearn.ir"
                    target="blank"
                    className="text-purple-800 text-lg font-Poppins-Medium ml-2"
                  >
                    https://sabzlearn.ir
                  </a>
                </span>
                <div className="flex *:mr-3 **:pr-1 mb-6">
                  <div>
                    <span className="font-Poppins-Medium text-2xl">
                      {!loading && userPageInfo.followersCount}
                    </span>
                    <button
                      onClick={() => setIsFollowersModalOpen(true)}
                      className=" text-xl cursor-pointer"
                      disabled={!loading && !userPageInfo.followersCount}
                    >
                      Followers
                    </button>
                  </div>
                  <div>
                    <span className="font-Poppins-Medium text-2xl">
                      {!loading && userPageInfo.followingsCount}
                    </span>
                    <button
                      onClick={() => setIsFollowingsModalOpen(true)}
                      className=" text-xl cursor-pointer"
                      disabled={!loading && !userPageInfo.followingsCount}
                    >
                      Followings
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex *:border-2  *:p-3 *:px-5 *:rounded-full *:hover:cursor-pointer mr-4 items-center font-Poppins-SemiBold">
                {user.username !== userPageInfo.username ? (
                  <FollowUnfollowBtn
                    disabled={followLoading}
                    handleFollow={handleFollow}
                    isFollowed={isFollowing}
                  />
                ) : (
                  <button className="border-purple-900 text-purple-800 mr-3 ">
                    Manage
                  </button>
                )}
              </div>
            </div>
            {!loading && !userPageInfo.isVerified && (
              <VerificationError className="mx-6" />
            )}
          </section>
          <PostsFilterNav />

          {error?.status === 403 && (
            <div className="flex flex-col w-full justify-center items-center h-96 rounded-lg">
              <MdLockOutline className="text-7xl text-neutral-800 mb-4" />
              <h4 className="text-4xl font-Poppins-Bold text-neutral-800">
                This Page is Private
              </h4>
            </div>
          )}

          {!loading && userPageInfo?.posts?.length < 1 ? (
            <div className="flex flex-col w-full justify-center items-center h-96 rounded-lg">
              <PiCameraSlashBold className="text-7xl text-neutral-800" />
              <h4 className="text-4xl font-Poppins-Bold text-neutral-800">
                No Posts Yet
              </h4>
            </div>
          ) : (
            !loading &&
            userPageInfo.posts?.map((post, i) => (
              <PostCard avatar={userPageInfo.avatarUrl} key={i} post={post} />
            ))
          )}
        </main>
      )}
      <aside className="flex flex-col w-[28dvw] *:mb-4 *:bg-white *:p-3 ">
        <div className="flex flex-col rounded-lg w-full">
          <h3 className="font-Poppins-Medium text-xl mb-5">People to follow</h3>
          <UserCard
            imageSrc="images/rad_front.jpg"
            name={"Mr.Saeedi rad"}
            username={"rad_front"}
            isVerified
          />
          <UserCard
            imageSrc="images/cristiano.png"
            name={"Mr.Saeedi rad"}
            username={"rad_front"}
            isVerified
          />
          <UserCard
            imageSrc="images/jadi.jpg"
            name={"Mr.Saeedi rad"}
            username={"rad_front"}
            isVerified
          />
        </div>
        <div className="flex flex-col rounded-lg w-full">
          <h3 className="font-Poppins-Medium text-xl mb-5">Trending now</h3>
          <Hashtag name={"Developer👨‍💻"} />
          <Hashtag name={"Sabzlearn"} />
          <Hashtag name={"radiogeek"} />
          <Hashtag name={"master_freelance"} />
          <Hashtag name={"reactjs"} />
        </div>
        <div className="flex flex-col rounded-lg w-full">
          <h3 className="font-Poppins-Medium text-xl mb-5">What's happening</h3>
          <div className="flex flex-wrap justify-between *:w-28 *:h-28 *:m-1.5 *:object-cover *:rounded-sm">
            <img src="images/feed-1.jpg" alt="" />
            <img src="images/feed-2.jpg" alt="" />
            <img src="images/feed-3.jpg" alt="" />
            <img src="images/feed-4.jpg" alt="" />
            <img src="images/feed-5.jpg" alt="" />
            <img src="images/feed-6.jpg" alt="" />
            <img src="images/feed-7.jpg" alt="" />
            <img src="images/feed-8.jpg" alt="" />
          </div>
        </div>
      </aside>
      <FollowingsModal
        isOpen={isFollowingsModalOpen}
        onClose={setIsFollowingsModalOpen}
      />
      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={setIsFollowersModalOpen}
      />
    </div>
  );
};

export default ProfilePage;
