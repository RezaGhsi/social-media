import { Bookmark, Compass, House, Plus, UserRound } from "lucide-react"
import { useAuth } from "../../features/auth/hooks/useAuth"

const MobileNav = ({ activeTab = "home" }) => {
  const { user } = useAuth();

  return (
    <nav className="flex sticky bottom-0 w-full *:flex-col md:hidden *:flex *:gap-1 font-Poppins-Medium *:justify-center *:*:nth-2:text-xs *:items-center bg-white h-16 px-6 mt-6 justify-around *:p-2 ">
      <a href="/" className={`${activeTab === "home" ? "text-violet-800/75" : "text-neutral-500"}`}>
        <House />
        <h2>Home</h2>
      </a>

      <a className={`${activeTab === "explore" ? "text-violet-800/75" : "text-neutral-500"}`}>
        <Compass />
        <h2>Explore</h2>
      </a>

      <a href="/upload" className={`${activeTab === "create" ? "text-violet-800/75" : "text-neutral-500"}`}>
        <Plus />
        <h2>Create</h2>
      </a>

      <a href="/saved-posts" className={`${activeTab === "saved" ? "text-violet-800/75" : "text-neutral-500"}`}>
        <Bookmark />
        <span>Saved</span>
      </a>

      <a href={`/${user.username}`} className={`${activeTab === "profile" ? "text-violet-800/75" : "text-neutral-500"}`}>
        <UserRound />
        <h2>Profile</h2>
      </a>
    </nav>
  )
}
export default MobileNav