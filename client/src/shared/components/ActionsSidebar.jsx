import { Bookmark, Compass, House, Plus, Settings2, UserRound } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import AvatarImg from "../../features/users/components/AvatarImg";

const ActionsSidebar = ({ activeTab = "home" }) => {
  const { user, isInitializing, isAuthenticated } = useAuth();

  return (
    <>
      <aside className="sticky top-4 ml-8 md:flex h-160 hidden w-50 flex-col gap-6">
        {!isInitializing && isAuthenticated && (
          <article className="rounded-lg">
            {isInitializing ? (
              <div className="flex gap-2.5 items-center">
                <div className="h-10 w-10 animate-pulse overflow-hidden rounded-full bg-neutral-300"></div>
                <div className="*:h-2.5 *:animate-pulse *:rounded-lg *:bg-neutral-300">
                  <div className="mb-2 w-30"></div>
                  <div className="w-20"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 ">
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <AvatarImg avatarUrl={user?.avatarUrl} />
                </div>
                <div>
                  <p className="user-profile-name font-Poppins-SemiBold mb-0.5 text-sm text-gray-900">
                    {user?.name}
                  </p>
                  <p className="font-Poppins-Light text-xs text-gray-500">
                    @{user?.username}
                  </p>
                </div>
              </div>
            )}
          </article>
        )}

        <section className="overflow-hidden flex flex-col gap-2 *:cursor-pointer rounded-lg h-68 w-full *:h-12 *:w-full *:rounded-xl *:flex *:gap-3.5 *:p-3.5 *:transition-colors *:hover:bg-violet-200/40 *:font-Poppins-Medium">
          <a href="/" className={`${activeTab === "home" ? "text-violet-700 bg-violet-200/40" : ""}`}>
            <House />
            <h2>Home</h2>
          </a>

          <a className={`${activeTab === "explore" ? "text-violet-700 bg-violet-200/40" : ""}`}>
            <Compass />
            <h2>Explore</h2>
          </a>

          <a href="/saved-posts" className={`${activeTab === "saved" ? "text-violet-700 bg-violet-200/40" : ""}`}>
            <Bookmark />
            <span>Saved</span>
          </a>

          <a className={`${activeTab === "profile" ? "text-violet-700 bg-violet-200/40" : ""}`}>
            <UserRound />
            <h2>Profile</h2>
          </a>

          <a className={`${activeTab === "settings" ? "text-violet-700 bg-violet-200/40" : ""}`}>
            <Settings2 />
            <h2>Settings</h2>
          </a>
        </section>

        <a
          href="upload"
          className="flex w-full gap-2 h-12 items-center cursor-pointer justify-center rounded-xl bg-violet-900/75 text-white transition-colors hover:bg-violet-900/70 active:bg-violet-900/90"
        >
          <Plus size={20} strokeWidth={2.5} />
          Create a post
        </a>
      </aside>
    </>
  );
};
export default ActionsSidebar;
