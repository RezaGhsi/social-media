import ActionsSidebar from "../shared/components/ActionsSidebar";
import PostCard from "../features/posts/components/PostCard";
import { CameraOff, CheckCheck, Loader } from "lucide-react";
import useHomeFeed from "../shared/hooks/useHomeFeed";
import useInfiniteScroll from "../shared/hooks/useInfiniteScroll";
import MobileNav from "../shared/components/MobileNav";

const HomePage = ({ feed = "following" }) => {
  // const [loadingPosts, setLoadingPosts] = useState(true);
  // const [posts, setPosts] = useState(null);
  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const { data } = await getHomePagePosts();
  //       setPosts(data.posts);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoadingPosts(false);
  //     }
  //   };
  //   getPosts();
  // }, []);

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useHomeFeed();

  const posts = data?.pages.flatMap((p) => p.posts) ?? [];

  const sentinelRef = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    { enabled: hasNextPage },
  );
  return (
    <div className="flex pt-8 flex-col items-center bg-[#F7F7FA]">
      <main className="flex gap-8 justify-between">
        <ActionsSidebar />

        <section className="">

          {isLoading ? (
            <div className="font-Poppins-SemiBold flex h-40 w-170 items-center justify-center gap-3">
              Loading posts
              <Loader className="size-10 animate-spin" />
            </div>
          ) : (
            <section
              className="max-w-155 md:flex-1 mb-6 lg:mx-0 mx-4 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-1.5">
                <h3 className="text-4xl font-Poppins-Medium">A little inspiration</h3>
                <p className="text-neutral-500">Fresh moments from the people you follow</p>
              </div>

              <div className={`flex gap-6 transition-colors`}>
                <span className={`${feed === "following" ? "text-violet-700 border-b-3 font-Poppins-Medium -mt-2 border-violet-500" : "text-neutral-500"}`}>Following</span>
                <span className={`${feed === "forYou" ? "text-violet-700 border-b-3 font-Poppins-Medium -mt-2 border-violet-500" : "text-neutral-500"}`}>For you</span>
              </div>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post._id} post={post} user={post.user} />
                ))
              ) : (
                <div className="flex h-90 flex-col items-center bg-white border-2 border-neutral-200 justify-center rounded-2xl">
                  <CameraOff className="size-24 text-violet-900/80" />
                  <h4 className="font-Poppins-SemiBold p-3 w-full text-center text-4xl">
                    No Posts Available.
                    <br /> Follow some users to see their posts.
                  </h4>
                </div>
              )}
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
            </section>
          )}

          {posts.length > 0 && !hasNextPage &&
            <div className="w-full flex flex-col p-6 gap-2 items-center">
              <CheckCheck size={28} className="text-violet-800/75" />
              <p className="text-lg font-Poppins-Medium">You’re all caught up.</p>
              <p className="text-neutral-500 text-sm">Time to make a little moment of your own.</p>
            </div>
          }

          <MobileNav />
        </section>

        <aside className="hidden lg:block mr-8">
          <section className="rounded-2xl max-w-86 flex flex-col gap-3 bg-violet-200/40 p-6 shadow">
            <h6 className="text-xs text-violet-700 font-Poppins-SemiBold">THE EVERY DAY EDIT</h6>
            <h5 className="text-2xl font-Poppins-Medium">Ordinary days. Extraordinary little things.</h5>
            <h6 className="text-xs text-neutral-500">A reminder to notice what’s already around you.</h6>
          </section>

          {/* <section className="mt-10 w-full rounded-lg bg-white p-4">

          </section>

          <section className="mt-10 flex w-full flex-col gap-2 rounded-lg">
            <h4 className="font-Poppins-SemiBold text-neutral-500">Requests</h4>
            <section className="flex flex-col gap-3">
              <RequestCard
                name={"Jeniffer Lowernce"}
                username={"jenifferLr"}
                avatarUrl={"/images/profile-1.jpg"}
              />

              <RequestCard
                name={"Elena Rashidi"}
                username={"elenaRs"}
                avatarUrl={"/images/profile-4.jpg"}
              />

              <RequestCard
                name={"shabnam.494"}
                username={"shab494_nr"}
                avatarUrl={"/images/profile-14.jpg"}
              />
            </section>
          </section> */}
        </aside>
      </main>
    </div>
  );
};

export default HomePage;
