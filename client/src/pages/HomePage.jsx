import { useAuth } from "../features/auth/hooks/useAuth";
import AvatarImg from "../features/users/components/AvatarImg";
import ActionsSidebar from "../shared/components/ActionsSidebar";
import MessageCard from "../shared/components/MessageCard";
import MessagesFilter from "../shared/components/MessagesFilter";
import StoryCard from "../shared/components/StoryCard";

const HomePage = () => {
  const { user, isInitializing } = useAuth();

  return (
    <div className="flex flex-col items-center bg-[#F1F1F1]">
      <main className="mx-4 my-8 flex max-w-360 justify-between gap-4">
        <ActionsSidebar />

        <section className="flex-3">
          <div className="mb-10 flex gap-4">
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
          </div>

          <section id="feeds" className="*:mb-4 *:rounded-lg *:bg-white *:p-2">
            <article className="feed-card shadow">
              <header>
                <a
                  href="/src/Pages/Profiles/Hosna/index.html"
                  className="flex items-center gap-3"
                >
                  <div>
                    <img
                      src="/images/profile-1.jpg"
                      alt="Profile card"
                      className="w-8 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-Poppins-Medium twitter-name text-sm">
                      Lena Mc'Queen
                    </p>
                    <p className="tweet-time">
                      <span>Dubai</span>,<span>6 Minutes Ago</span>
                    </p>
                  </div>
                </a>
              </header>

              <main className="tweet-body">
                <img
                  src="/images/feed-1.jpg"
                  className="tweet-image object-cover"
                  alt=""
                />
              </main>

              <footer className="px-4">
                <section className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button title="like" className="max-w-max">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>
                    <button title="comment" className="max-w-max">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                        />
                      </svg>
                    </button>
                    <button title="comment" className="max-w-max">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-xs text-gray-700">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </span>
                      <span className="text-xs"> 29,428 </span>
                    </div>

                    <div className="max-h-max">
                      <button className="save-button">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span> save </span>
                      </button>
                    </div>
                  </div>
                </section>

                <div className="relative mt-1 flex items-center">
                  <div className="liked-by-wrapper relative block">
                    <span>
                      <img
                        src="./images/profile-5.jpg"
                        className="likedBy"
                        alt=""
                      />
                    </span>
                    <span>
                      <img
                        src="./images/profile-6.jpg"
                        className="likedBy left-3 z-10"
                        alt=""
                      />
                    </span>
                    <span> </span>
                    <img
                      src="./images/profile-7.jpg"
                      className="likedBy left-6 z-20"
                      alt=""
                    />
                  </div>

                  <div className="text-sm">
                    <span> Liked by </span>
                    <span>
                      <strong> rad_front </strong>
                    </span>
                    <span> and </span>
                    <span>
                      <strong> 2,923 others </strong>
                    </span>
                  </div>
                </div>

                <div className="mt-1 gap-1 text-sm">
                  <span>
                    <strong> Lena Mc'Queen </strong>
                  </span>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>

                <div>
                  <button className="max-w-max text-xs text-gray-500">
                    View all 294 comments ..
                  </button>
                </div>
              </footer>
            </article>

            <article className="feed-card shadow">
              <header>
                <a
                  href="/src/Pages/Profiles/Hosna/index.html"
                  className="flex items-center gap-3"
                >
                  <div>
                    <img
                      src="/images/profile-2.jpg"
                      alt="Profile card"
                      className="w-8 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-Poppins-Medium twitter-name text-sm">
                      Davood amiri
                    </p>
                    <p className="tweet-time">
                      <span>Dubai</span>,<span>6 Minutes Ago</span>
                    </p>
                  </div>
                </a>
              </header>
              <main className="tweet-body">
                <img
                  src="/images/feed-2.jpg"
                  className="tweet-image object-cover"
                  alt=""
                />
              </main>
              <footer className="px-4">
                <div className="flex items-center gap-2">
                  <button title="like" className="max-w-max">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                  <button title="comment" className="max-w-max">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>
                  </button>
                  <button title="comment" className="max-w-max">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="relative mt-1 flex items-center">
                  <div className="liked-by-wrapper relative block">
                    <span>
                      <img
                        src="./images/profile-5.jpg"
                        className="likedBy"
                        alt=""
                      />
                    </span>
                    <span>
                      <img
                        src="./images/profile-6.jpg"
                        className="likedBy left-3 z-10"
                        alt=""
                      />
                    </span>
                    <span>
                      <img
                        src="./images/profile-7.jpg"
                        className="likedBy left-6 z-20"
                        alt=""
                      />
                    </span>
                  </div>
                  <div className="text-sm">
                    <span> Liked by </span>
                    <span>
                      <strong> rad_front </strong>
                    </span>
                    <span> and </span>
                    <span>
                      <strong> 2,923 others </strong>
                    </span>
                  </div>
                </div>
                <div className="mt-1 gap-1 text-sm">
                  <span>
                    <strong> Lena Mc'Queen </strong>
                  </span>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div>
                  <button className="max-w-max text-xs text-gray-500">
                    View all 294 comments ..
                  </button>
                </div>
              </footer>
            </article>

            <article className="feed-card shadow">
              <header>
                <a
                  href="/src/Pages/Profiles/Hosna/index.html"
                  className="flex items-center gap-3"
                >
                  <div>
                    <img
                      src="/images/profile-3.jpg"
                      alt="Profile card"
                      className="w-8 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-Poppins-Medium twitter-name text-sm">
                      Hosna Kazemi
                    </p>
                    <p className="tweet-time">
                      <span>Dubai</span>,<span>6 Minutes Ago</span>
                    </p>
                  </div>
                </a>
              </header>
              <main className="tweet-body">
                <img
                  src="/images/feed-3.jpg"
                  className="tweet-image object-cover"
                  alt=""
                />
              </main>
              <footer className="px-4">
                <div className="flex items-center gap-2">
                  <button title="like" className="max-w-max">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                  <button title="comment" className="max-w-max">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>
                  </button>
                  <button title="comment" className="max-w-max">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="relative mt-1 flex items-center">
                  <div className="text-sm">
                    <span> Liked by </span>
                    <span>
                      <strong> rad_front </strong>
                    </span>
                    <span> and </span>
                    <span>
                      <strong> 2,923 others </strong>
                    </span>
                  </div>
                </div>
                <div className="mt-1 gap-1 text-sm">
                  <span>
                    <strong> Lena Mc'Queen </strong>
                  </span>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div>
                  <button className="max-w-max text-xs text-gray-500">
                    View all 294 comments ..
                  </button>
                </div>
              </footer>
            </article>
          </section>
        </section>

        <aside id="right-sidebar" className="flex-2">
          <section className="rounded-lg bg-white p-4 shadow">
            <header>
              <div className="mb-4 flex justify-between">
                <p>
                  <strong> Messages </strong>
                </p>
                <button className="max-w-max">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative mb-6 flex items-center rounded-full bg-[#f1f1f1] py-3">
                <span className="top-2-5 absolute left-3 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
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

          <section
            id="popular-posts"
            className="mt-10 w-full rounded-lg bg-white p-4 shadow"
          >
            <header>
              <div className="flex justify-between">
                <p>
                  <strong> Popular posts </strong>
                </p>
              </div>
            </header>
            <main className="mt-4">
              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-10.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="mb-1 line-clamp-2 text-xs text-gray-900">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-xs text-gray-600">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-9.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="mb-1 line-clamp-2 text-xs text-gray-900">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-xs text-gray-600">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-4.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="mb-1 line-clamp-2 text-xs text-gray-900">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-xs text-gray-600">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-2.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="mb-1 line-clamp-2 text-xs text-gray-900">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-xs text-gray-600">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>
            </main>
          </section>

          <section
            id="popular-users"
            className="mt-10 w-full rounded-lg bg-white p-4 shadow"
          >
            <header>
              <div className="flex justify-between gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-gold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p>
                    <strong> Popular users </strong>
                  </p>
                </div>
              </div>
            </header>
            <main className="mt-4">
              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-10.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="mb-1 line-clamp-2 text-xs text-gray-900">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-xs text-gray-600">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-9.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="mb-1 line-clamp-2 text-xs text-gray-900">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-xs text-gray-600">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-4.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="mb-1 line-clamp-2 text-xs text-gray-900">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-xs text-gray-600">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>

              <article className="popular-post">
                <div className="">
                  <img
                    src="/images/feed-2.jpg"
                    className="popular-post_icon"
                    alt=""
                  />
                </div>
                <div>
                  <p className="mb-1 line-clamp-2 text-xs text-gray-900">
                    <strong>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Incidunt quod deserunt distinctio.
                    </strong>
                  </p>
                  <div className="text-xs text-gray-600">
                    <p>28 March 2024</p>
                  </div>
                </div>
              </article>
            </main>
          </section>

          <section id="requests">
            <h4>Requests</h4>
            <section>
              <article className="request-card">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src="/images/profile-1.jpg"
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="font-Poppins-SemiBold text-sm">
                      Jeniffer Lowernce
                    </p>
                    <p className="text-xs text-gray-500">2 Mutual friends</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="accept-button max-w-max">Accept</button>
                  <button className="decline-button max-w-max">Decline</button>
                </div>
              </article>

              <article className="request-card">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src="/images/profile-4.jpg"
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="font-Poppins-SemiBold text-sm">
                      Elena Rashidi
                    </p>
                    <p className="text-xs text-gray-500">6 Mutual friends</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="accept-button max-w-max">Accept</button>
                  <button className="decline-button max-w-max">Decline</button>
                </div>
              </article>

              <article className="request-card">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src="/images/profile-14.jpg"
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="font-Poppins-SemiBold text-sm">shabnam.494</p>
                    <p className="text-xs text-gray-500">14 Mutual friends</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="accept-button max-w-max">Accept</button>
                  <button className="decline-button max-w-max">Decline</button>
                </div>
              </article>
            </section>
          </section>
        </aside>
      </main>
    </div>
  );
};

export default HomePage;
