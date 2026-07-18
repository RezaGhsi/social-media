import { useAuth } from "../../../features/auth/hooks/useAuth";
import AvatarImg from "../../../features/users/components/AvatarImg";

const Header = () => {
  const baseURL = import.meta.env.VITE_STATIC_BASE_URL;

  const { user, isAuthenticated, isInitializing } = useAuth();

  return (
    <>
      <header>
        <nav className="flex h-22 w-full items-center justify-between px-4 py-6">
          <div>
            <a className="font-Poppins-Black text-2xl text-[#0f172a]" href="/">
              nekoSocial
            </a>
          </div>
          <div className="search-box relative flex h-11 w-85 items-center rounded-2xl bg-[#f1f1f1]">
            <span className="search-icon absolute ml-4 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
            <input
              placeholder="Search in Neko Social .."
              type="text"
              className="placeholder:font-Poppins-SemiBold ml-2 h-full w-full bg-transparent px-8 outline-0 placeholder:text-neutral-700"
            />
          </div>
          {!isInitializing ? (
            <div>
              {!isAuthenticated ? (
                <div className="flex w-50 items-center justify-end gap-4 text-white *:rounded-md *:bg-indigo-600 *:p-3 *:px-4">
                  <a href="/login">login</a>
                  <a href="/register">sign up</a>
                </div>
              ) : (
                <div className="flex w-50 items-center">
                  <a
                    className="font-Poppins-Medium mr-3 rounded-3xl bg-indigo-600 px-8 py-3 text-white"
                    href="/upload"
                  >
                    Create
                  </a>
                  <div className="h-15 w-15 overflow-hidden rounded-full">
                    <a
                      href={`/${user.username}`}
                      className="h-full w-full border-none bg-transparent"
                    >
                      <AvatarImg avatarUrl={user.avatarUrl} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full w-50 animate-pulse justify-end gap-4 transition-colors *:rounded-sm *:bg-neutral-300">
              <div className="w-16"></div>
              <div className="w-24"></div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
