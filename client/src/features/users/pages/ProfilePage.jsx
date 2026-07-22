import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
import { getUserProfile } from "../api/userApi";
import FollowingsModal from "../components/FollowingsModal";
import FollowersModal from "../components/FollowersModal";
import AvatarImg from "../components/AvatarImg";

const ProfilePage = () => {
  const [userPageInfo, setUserPageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowingsModalOpen, setIsFollowingsModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [ownPage, setOwnPage] = useState(false);

  const { user } = useAuth();

  const { username } = useParams();

  useEffect(() => {
    const getUser = async (username) => {
      try {
        const { data } = await getUserProfile(username);
        setUserPageInfo(data.user);
        setIsFollowing(data.user.isFollowing);
        setOwnPage(user.username === data.user.username);
      } catch (error) {
        setError(error);
        setUserPageInfo(error.response.data.user);
      } finally {
        setLoading(false);
      }
    };
    getUser(username);
  }, []);

  if (error?.response.status === 404) return <NotFound />;

  return (
    <div className="flex flex-1 justify-center scroll-smooth bg-[#E6ECF6] px-10 pt-8">
      {loading ? (
        <div className="mr-4 flex w-[69dvw] justify-center">
          <FaSpinner className="mt-20 animate-spin text-3xl" />
        </div>
      ) : (
        <main className="mr-4 flex w-[69dvw] flex-col items-center rounded-lg *:mb-4 *:bg-white">
          <section className="w-full rounded-t-lg">
            <div className="relative h-[30dvh] w-full overflow-hidden rounded-t-lg">
              <img
                src="images/feed-6.jpg"
                alt="Banner Image"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="absolute z-20 -mt-19 ml-8 h-38 w-38 shrink-0 overflow-hidden rounded-full border-2 border-white">
              <AvatarImg avatarUrl={userPageInfo.avatarUrl} />
            </div>
            <div className="flex justify-between">
              <div className="ml-8 w-[36dvw] pt-24">
                <h1 className="font-Poppins-ExtraBold text-2xl">
                  {userPageInfo.name}
                </h1>
                <span className="font-Poppins-Medium">
                  @{userPageInfo.username}
                </span>
                <p className="font-Poppins-Medium mt-6 mb-6 text-xl">
                  {userPageInfo.biography || ""}
                </p>
                <span className="mb-6 flex items-center text-neutral-700">
                  {user.website && <BsGlobe2 />}
                  <a
                    href="https://sabzlearn.ir"
                    target="blank"
                    className="font-Poppins-Medium ml-2 text-lg text-purple-800"
                  >
                    {user?.website}
                  </a>
                </span>
                <div className="mb-6 flex *:mr-3 **:pr-1">
                  <div>
                    <span className="font-Poppins-Medium text-2xl">
                      {!loading && userPageInfo.followersCount}
                    </span>
                    <button
                      onClick={() => setIsFollowersModalOpen(true)}
                      className="cursor-pointer text-xl"
                      disabled={
                        (!loading && !userPageInfo.followersCount) ||
                        (!isFollowing && userPageInfo.isPrivate)
                      }
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
                      className="cursor-pointer text-xl"
                      disabled={
                        (!loading && !userPageInfo.followingsCount) ||
                        (!isFollowing && userPageInfo.isPrivate)
                      }
                    >
                      Followings
                    </button>
                  </div>
                </div>
              </div>
              <div className="font-Poppins-SemiBold mr-4 flex items-center *:rounded-full *:border-2 *:p-3 *:px-5 *:hover:cursor-pointer">
                {!ownPage ? (
                  <FollowUnfollowBtn
                    setIsFollowing={setIsFollowing}
                    isFollowing={isFollowing}
                    username={username}
                  />
                ) : (
                  <a
                    href={`/manage`}
                    className="mr-3 border-purple-900 text-purple-800"
                  >
                    Manage
                  </a>
                )}
              </div>
            </div>
            {!loading && ownPage && !userPageInfo.isVerified && (
              <VerificationError className="mx-6" />
            )}
          </section>
          <PostsFilterNav />

          {!isFollowing && userPageInfo.isPrivate && (
            <div className="flex h-96 w-full flex-col items-center justify-center rounded-lg">
              <MdLockOutline className="mb-4 text-7xl text-neutral-800" />
              <h4 className="font-Poppins-Bold text-4xl text-neutral-800">
                This Page is Private
              </h4>
            </div>
          )}

          {!loading && userPageInfo?.posts?.length < 1 ? (
            <div className="flex h-96 w-full flex-col items-center justify-center rounded-lg">
              <PiCameraSlashBold className="text-7xl text-neutral-800" />
              <h4 className="font-Poppins-Bold text-4xl text-neutral-800">
                No Posts Yet
              </h4>
            </div>
          ) : (
            !loading &&
            userPageInfo.posts?.map((post, i) => (
              <PostCard
                avatar={userPageInfo.avatarUrl}
                key={i}
                name={userPageInfo.name}
                post={post}
              />
            ))
          )}
        </main>
      )}
      <aside className="flex w-[28dvw] flex-col *:mb-4 *:bg-white *:p-3">
        <div className="flex w-full flex-col rounded-lg">
          <h3 className="font-Poppins-Medium mb-5 text-xl">People to follow</h3>
          <UserCard name={"Mr.Saeedi rad"} username={"rad_front"} isVerified />
          <UserCard name={"Mr.Saeedi rad"} username={"rad_front"} isVerified />
          <UserCard name={"Mr.Saeedi rad"} username={"rad_front"} isVerified />
        </div>
        <div className="flex w-full flex-col rounded-lg">
          <h3 className="font-Poppins-Medium mb-5 text-xl">Trending now</h3>
          <Hashtag name={"Developer👨‍💻"} />
          <Hashtag name={"Sabzlearn"} />
          <Hashtag name={"radiogeek"} />
          <Hashtag name={"master_freelance"} />
          <Hashtag name={"reactjs"} />
        </div>
        <div className="flex w-full flex-col rounded-lg">
          <h3 className="font-Poppins-Medium mb-5 text-xl">What's happening</h3>
          <div className="flex flex-wrap justify-around *:m-1.5 *:h-28 *:w-28 *:rounded-sm *:object-cover">
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
