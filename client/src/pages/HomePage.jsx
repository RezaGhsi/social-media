import { useEffect, useState } from "react";
import ActionsSidebar from "../shared/components/ActionsSidebar";
import MessageCard from "../shared/components/MessageCard";
import MessagesFilter from "../shared/components/MessagesFilter";
import StoryCard from "../shared/components/StoryCard";
import { getHomePagePosts } from "../features/posts/api/postApi";
import PostCard from "../features/posts/components/PostCard";
import { PenBox, Search, Star } from "lucide-react";
import PopularPostCard from "../shared/components/PopularPostCard";
import RequestCard from "../shared/components/RequestCard";

const HomePage = () => {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await getHomePagePosts();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPosts(false);
      }
    };
    getPosts();
  }, []);
  return (
    <div className="flex flex-col items-center bg-[#F1F1F1]">
      <main className="mx-4 my-8 flex justify-between gap-4">
        <ActionsSidebar />

        <section className="max-w-170">
          {/* <div className="mb-10 flex w-full justify-between gap-4">
            <StoryCard
              storyUrl="/images/story-1.jpg"
              avatarUrl="/images/profile-13.jpg"
              name="Elisabet Johnson"
            />
            <StoryCard
              storyUrl="/images/story-2.jpg"
              avatarUrl="/images/profile-13.jpg"
              name="Elisabet Johnson"
            />
            <StoryCard
              storyUrl="/images/story-3.jpg"
              avatarUrl="/images/profile-14.jpg"
              name="Elisabet Johnson"
            />
            <StoryCard
              storyUrl="/images/story-4.jpg"
              avatarUrl="/images/profile-15.jpg"
              name="Elisabet Johnson"
            />
            <StoryCard
              storyUrl="/images/story-5.jpg"
              avatarUrl="/images/profile-16.jpg"
              name="Elisabet Johnson"
            />
          </div> */}

          <section id="feeds" className="*:mb-4 *:rounded-lg *:bg-white *:p-2">
            {!loadingPosts &&
              posts.map((post) => <PostCard post={post} user={post.user} />)}
          </section>
        </section>

        <aside id="right-sidebar" className="max-w-110">
          <section className="rounded-lg bg-white p-4 shadow">
            <header>
              <div className="mb-4 flex justify-between">
                <p>
                  <strong> Messages </strong>
                </p>
                <button className="max-w-max">
                  <PenBox />
                </button>
              </div>

              <div className="relative mb-6 flex items-center rounded-full bg-[#f1f1f1] py-3">
                <span className="top-2-5 absolute left-3 text-gray-500">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="placeholder:font-Poppins-SemiBold ml-9 w-full text-sm outline-0"
                  maxLength="40"
                  placeholder="Search messages.."
                />
              </div>

              <MessagesFilter />
            </header>
            <main className="mt-4">
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
            </main>
          </section>

          <section className="mt-10 w-full rounded-lg bg-white p-4">
            <header>
              <div className="flex justify-between">
                <p>
                  <strong> Popular posts </strong>
                </p>
              </div>
            </header>
            <main className="mt-4 flex flex-col gap-8 pb-5">
              <PopularPostCard
                mediaUrl={"/images/feed-10.jpg"}
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inciduntquod deserunt distinctio."
              />

              <PopularPostCard
                mediaUrl={"/images/feed-9.jpg"}
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inciduntquod deserunt distinctio."
              />

              <PopularPostCard
                mediaUrl={"/images/feed-4.jpg"}
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inciduntquod deserunt distinctio."
              />

              <PopularPostCard
                mediaUrl={"/images/feed-2.jpg"}
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inciduntquod deserunt distinctio."
              />
            </main>
          </section>

          <section className="mt-10 w-full rounded-lg bg-white p-4">
            <header>
              <div className="flex justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span>
                    <Star color="#FFD700" fill="#FFD700" size={22} />
                  </span>
                  <p>
                    <strong> Popular users </strong>
                  </p>
                </div>
              </div>
            </header>
            <main className="mt-4 flex flex-col gap-8 pb-5">
              <PopularPostCard
                mediaUrl={"/images/feed-10.jpg"}
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inciduntquod deserunt distinctio."
              />

              <PopularPostCard
                mediaUrl={"/images/feed-9.jpg"}
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inciduntquod deserunt distinctio."
              />

              <PopularPostCard
                mediaUrl={"/images/feed-4.jpg"}
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inciduntquod deserunt distinctio."
              />

              <PopularPostCard
                mediaUrl={"/images/feed-2.jpg"}
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inciduntquod deserunt distinctio."
              />
            </main>
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
          </section>
        </aside>
      </main>
    </div>
  );
};

export default HomePage;
