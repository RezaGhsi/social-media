import { useAuth } from "./../../auth/hooks/useAuth";

const UploadPage = () => {
  const { user } = useAuth();
  return (
    <div>
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
              href="#"
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

      <main className="flex h-[88dvh] bg-[#6060db] w-full justify-center items-center ">
        <section className="flex w-[95dvw] bg-white rounded-xl shadow-[12px] p-16 justify-between items-center gap-6 ">
          <div className="h-full w-[50%] ml-8 ">
            <h3 className="text-5xl text-indigo-600 font-Poppins-SemiBold ">
              File upload
            </h3>

            <div
              id="file-upload-box"
              className="mt-5 w-[80%] h-120 relative bg-[#cecefd] text-indigo-800 border-2 border-dashed border-indigo-800 rounded-2xl flex flex-col justify-center items-center "
            >
              <span className="mt-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-32 h-32"
                >
                  <path d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" />
                </svg>
              </span>
              <div className="upload-file-txt">
                <p className="text-3xl font-Poppins-Medium mt-10">
                  Upload a file
                </p>
              </div>
              <p
                className="font-Poppins-Bold text-3xl bg-indigo-800 p-4 rounded-lg text-white mt-10 mb-12 "
                id="browse-files"
              >
                Browse file
              </p>

              <input
                type="file"
                id="file-upload-input"
                accept="video/*, image/*"
                className="absolute h-full w-full opacity-0 cursor-pointer "
              />
            </div>
          </div>

          <div className="post-upload-box w-[50%] h-full transition-all ">
            <h3 className="file-upload-title text-5xl text-indigo-800 font-Poppins-SemiBold">
              Post details
            </h3>

            <div className="mt-6 w-full h-40 ">
              <label htmlFor="post-description">
                <span className="font-Poppins-Medium">Description</span>
                <span className="text-red-600 text-lg ml-1">*</span>
              </label>
              <textarea
                name="post-description"
                id="post-description"
                placeholder="Add a description .."
                className="w-full mt-3 h-full border-2 border-[#7474c5] rounded-md p-4 placeholder:font-Poppins-SemiBold placeholder:text-neutral-600 "
              ></textarea>
            </div>

            <div className="mt-17 flex flex-col">
              <label htmlFor="post-hashtags">
                <span className="font-Poppins-Medium">Hashtags</span>
                <span className="text-red-600 text-lg ml-1">*</span>
              </label>
              <input
                type="text"
                id="post-hashtags"
                name="post-hashtags"
                placeholder="javascript, edit, trend, explore, ne..."
                className="border-2 mt-3 border-[#7474c5] rounded-md p-3 placeholder:font-Poppins-SemiBold placeholder:text-neutral-600"
              />
              <div
                id="hashtags-wrap"
                className="flex text-sm my-2 items-center gap-2"
              ></div>
              <span className="text-sm font-Poppins-Medium">
                Split the hashtags with comma ( , )
              </span>
            </div>
            {!user?.isVerified && (
              <div className="p-3 px-4 mt-3 bg-red-500/15 flex transition-all justify-between items-center rounded-lg">
                <span className="font-Poppins-SemiBold text-xl text-red-700">
                  You need to verify your account
                </span>
                <div>
                  <button
                    id="send-verification-request"
                    className="send-verification bg-red-600 text-white px-4 py-3 rounded-lg cursor-pointer active:bg-red-400 "
                  >
                    Send verification
                  </button>
                </div>
              </div>
            )}
            <div className="mt-4 flex items-center justify-end">
              <button
                disabled={!user.isVerified}
                className="bg-indigo-800 text-white text-xl p-4 rounded-lg mt-1 cursor-pointer transition-all active:bg-indigo-600 disabled:bg-gray-600 disabled:text-neutral-300 disabled:cursor-not-allowed "
              >
                Upload post
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default UploadPage;
