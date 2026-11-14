import { Search } from "lucide-react";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import AvatarImg from "../../../features/users/components/AvatarImg";
import CatSvg from '/icons/Vector.svg'

const Header = () => {
  const { user, isAuthenticated, isInitializing } = useAuth();

  return (
    <header className="flex justify-center">
      <nav className="flex h-22 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="/" className="flex items-center gap-3">
          <img src={CatSvg} alt="nekoSocial logo" className="p-3 w-13 h-13 bg-[#F0EAFB] rounded-2xl" />
          <h2 className="font-Poppins-SemiBold text-3xl">nekoSocial</h2>
        </a>
        <div className="relative h-11 w-97.5 p-3 mr-20 md:flex hidden items-center rounded-xl bg-[#F5F3F8]">
          <Search className="text-neutral-500" />
          <input
            placeholder="Search people, posts, and #hashtags"
            type="search"
            className="text-sm ml-2 h-full w-full bg-transparent outline-0 placeholder:text-neutral-500"
          />
        </div>
        {isInitializing ? (
          <div className="h-12 w-12 rounded-full animate-pulse bg-neutral-200">
          </div>
        ) : (
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <a
              href={`/${user.username}`}
              className="h-full w-full border-none bg-transparent"
            >
              <AvatarImg avatarUrl={user.avatarUrl} />
            </a>
          </div>
        )}
      </nav>
    </header>

  );
};

export default Header;
