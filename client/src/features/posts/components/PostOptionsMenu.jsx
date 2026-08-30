import { EllipsisVertical, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PostOptionsMenu = ({ handleRemovePost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xl transition-colors hover:bg-[#f1f1f1]"
      >
        <EllipsisVertical />
      </button>

      <button
        onClick={handleRemovePost}
        className={`font-Poppins-SemiBold absolute top-10 right-6 flex origin-top-right cursor-pointer items-center gap-2 rounded-lg bg-white p-2 px-4 text-red-500 shadow-[0_2px_15px_rgba(0,0,0,0.4)] transition-all *:cursor-pointer hover:bg-red-100 active:bg-red-200 active:ring-2 active:ring-red-400 ${
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0"
        }`}
      >
        <Trash2 />
        Remove
      </button>
    </div>
  );
};
export default PostOptionsMenu;
