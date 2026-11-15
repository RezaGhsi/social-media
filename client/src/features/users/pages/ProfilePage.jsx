import { useState } from "react";
import { useParams } from "react-router-dom";

import VerificationError from "../../../shared/components/VerificationError";
import FollowUnfollowBtn from "../../../shared/components/FollowUnfollowBtn";
import PostCard from "../../posts/components/PostCard";
import NotFound from "../../../pages/NotFound";

import { useAuth } from "../../auth/hooks/useAuth";
import FollowingsModal from "../components/FollowingsModal";
import FollowersModal from "../components/FollowersModal";
import AvatarImg from "../components/AvatarImg";
import { CameraOff, Link, Loader, LockKeyhole, Settings2 } from "lucide-react";
import useUserPosts from "../hooks/useUserPosts";
import useInfiniteScroll from "../../../shared/hooks/useInfiniteScroll";
import ErrorToast from "../../../shared/components/ErrorToast";
import { useUser } from "../hooks/useUser";
import ActionsSidebar from "../../../shared/components/ActionsSidebar";
import MobileNav from "../../../shared/components/MobileNav";

const ProfilePage = () => {
  const [isFollowingsModalOpen, setIsFollowingsModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);

  const { user } = useAuth();

  const { username } = useParams();

  const {
    data: userPageData,
    isLoading: isLoadingUserInfo,
    isError: isUserPageError,
    error: userPageError,
  } = useUser();

  const userPageInfo = userPageData?.user;
  const isFollowing = userPageData?.user?.isFollowing;
  const isOwnPage = user.username === userPageData?.user?.username;

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
  } = useUserPosts(username);

  const sentinelRef = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    { enabled: hasNextPage },
  );

  const posts = data?.pages.flatMap((p) => p.posts) ?? [];

  if (userPageError?.response?.status === 404) return <NotFound />;

  if (isError && error.status !== 403) {
    ErrorToast("an Error Accrued when Loading Posts");
  }

  return (
    <div className="flex flex-col flex-1 h-full items-center w-full shrink scroll-smooth bg-[#F7F7FA]">
      <main className="flex w-7xl flex-1 max-w-full shrink justify-between gap-8 pt-6 md:pt-8 px-4 md:px-8 2xl:px-0">

        <ActionsSidebar activeTab={isOwnPage ? "profile" : "explore"} />

        <div className="flex flex-col flex-1">
          {isLoadingUserInfo ? (
            <div className="flex w-full justify-center">
              <Loader className="mt-16 size-20 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center *:mb-4">
              <section className="w-full rounded-2xl bg-white">
                <div className="md:h-65 h-40 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src="/images/Photo.png"
                    alt="Banner Image"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute z-20 -mt-12 ml-6 h-25 w-25 overflow-hidden rounded-full border-5 border-white">
                  <AvatarImg avatarUrl={userPageInfo.avatarUrl} />
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-5 md:p-7 md:pt-17 p-5 pt-17 w-full">
                    <div className="flex justify-between w-full gap-5">
                      <div>
                        <h1 className="font-Poppins-SemiBold mb-0.5 text-xl sm:text-2xl md:text-3xl">
                          {userPageInfo.name}
                        </h1>
                        <span className="text-neutral-500">
                          @{userPageInfo.username}
                        </span>
                      </div>
                      <div className="font-Poppins-SemiBold flex items-center *:rounded-xl *:h-13 *:px-3 md:*:px-4 *:hover:cursor-pointer">
                        {!isOwnPage ? (
                          <FollowUnfollowBtn
                            isFollowing={isFollowing}
                            username={username}
                          />
                        ) : (
                          <a
                            href={`/manage`}
                            className="text-violet-900/75 active:bg-violet-900/25 gap-1 items-center flex bg-violet-200/40 transition-colors hover:bg-violet-200/70"
                          >
                            <Settings2 />
                            Manage
                          </a>
                        )}
                      </div>
                    </div>
                    <p>
                      {userPageInfo.biography || ""}
                    </p>
                    {user?.website && <span className="flex items-center text-violet-900/70">
                      <Link className="size-4" />
                      <a
                        href={`https://${user?.website}`}
                        target="blank"
                        className="font-Poppins-Medium ml-2 text-sm"
                      >
                        {user?.website}
                      </a>
                    </span>}
                    <hr className="text-neutral-200" />
                    <div className="flex justify-between md:justify-start md:gap-11 **:pr-1">
                      <div>
                        <span className="font-Poppins-Medium mr-1.5 text-2xl">
                          {!isLoadingUserInfo && userPageInfo.postsCount}
                        </span>
                        <span
                          className="cursor-pointer text-neutral-500 text-sm"
                        >
                          Posts
                        </span>
                      </div>
                      <div>
                        <span className="font-Poppins-Medium mr-1.5 text-2xl">
                          {!isLoadingUserInfo && userPageInfo.followersCount}
                        </span>
                        <button
                          onClick={() => setIsFollowersModalOpen(true)}
                          className="cursor-pointer text-neutral-500 text-sm"
                          disabled={
                            (!isLoadingUserInfo &&
                              !userPageInfo.followersCount) ||
                            (!isFollowing && userPageInfo.isPrivate)
                          }
                        >
                          Followers
                        </button>
                      </div>
                      <div>
                        <span className="font-Poppins-Medium mr-1.5 text-2xl">
                          {!isLoadingUserInfo && userPageInfo.followingsCount}
                        </span>
                        <button
                          onClick={() => setIsFollowingsModalOpen(true)}
                          className="cursor-pointer text-neutral-500 text-sm"
                          disabled={
                            (!isLoadingUserInfo &&
                              !userPageInfo.followingsCount) ||
                            (!isFollowing && userPageInfo.isPrivate)
                          }
                        >
                          Followings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {!isLoadingUserInfo && isOwnPage && !userPageInfo.isVerified && (
                  <VerificationError className="mx-6" />
                )}
              </section>

              {!isFollowing && userPageInfo.isPrivate ? (
                <div className="flex w-full h-full flex-col items-center justify-center rounded-lg bg-white">
                  <LockKeyhole className="mb-4 size-20 text-neutral-800" />
                  <h4 className="font-Poppins-SemiBold text-3xl text-neutral-800">
                    This Page is Private
                  </h4>
                </div>
              ) : (
                <section className="flex w-full h-full flex-col">
                  {!isLoading && posts?.length < 1 ? (
                    <div className="flex w-full h-full flex-col items-center justify-center rounded-lg bg-white">
                      <CameraOff className="size-20 text-neutral-800" />
                      <h4 className="font-Poppins-SemiBold text-3xl text-neutral-800">
                        No Posts Yet
                      </h4>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                      {posts?.map((post) => (
                        <PostCard
                          isOwnPage={isOwnPage}
                          user={userPageInfo}
                          key={post._id}
                          post={post}
                          mini
                        />
                      ))}
                      {hasNextPage && (
                        <div
                          className="bg[#f1f1f1] flex w-full items-center justify-center"
                          ref={sentinelRef}
                        >
                          {isFetchingNextPage ? (
                            <div className="font-Poppins-SemiBold flex h-40 items-center gap-3">
                              Loading posts
                              <Loader className="size-10 animate-spin" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </section>
              )}
            </div>
          )}
        </div>

        <FollowingsModal
          isOpen={isFollowingsModalOpen}
          onClose={setIsFollowingsModalOpen}
        />
        <FollowersModal
          isOpen={isFollowersModalOpen}
          onClose={setIsFollowersModalOpen}
        />
      </main>
      <MobileNav activeTab={isOwnPage ? "profile" : "explore"} />
    </div>
  );
};

export default ProfilePage;
