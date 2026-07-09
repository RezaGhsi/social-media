const Header = () => {
  return (
    <div>
      {" "}
      <header>
        <nav className="w-full flex justify-between p-6">
          <div>
            <a
              className="font-Poppins-Black text-2xl text-[#0f172a]"
              href="/index.html"
            >
              nekoSocial
            </a>
          </div>
          <div className="relative w-85 h-11 bg-[#f1f1f1] search-box rounded-2xl flex items-center">
            <span className="absolute search-icon ml-4 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
            <input
              placeholder="Search in Neko Social .."
              type="text"
              className="bg-transparent ml-2 outline-0 placeholder:font-Poppins-SemiBold placeholder:text-neutral-700 px-8 w-full h-full "
            />
          </div>
          <div className="flex gap-6 items-center">
            <a
              className="create-button px-8 py-3 text-white font-Poppins-Medium rounded-3xl bg-indigo-600"
              href="/upload"
            >
              Create
            </a>
            <div className="w-12 h-12 overflow-hidden rounded-full">
              <button
                id="profileButton"
                className="w-full h-full bg-transparent border-none"
              >
                <img
                  src="/images/profile-8.jpg"
                  className="object-cover"
                  alt="profile cover"
                />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
