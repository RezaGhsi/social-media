import { useState } from "react";
import { useAuth } from "./../../auth/hooks/useAuth";
import { upload } from "./../api/postApi";
import { toast } from "sonner";
import Header from "../../../shared/components/layout/Header";
import VerificationError from "../../../shared/components/VerificationError";

const UploadPage = () => {
  const { user } = useAuth();

  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ description: "", hashtags: "" });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return toast.error("Please Select a File", {
        style: {
          background: "red",
          color: "white",
          fontSize: "20px",
          width: "auto",
        },
      });
    }

    const formData = new FormData();
    formData.append("description", form.description);
    formData.append("hashtags", form.hashtags);
    formData.append("media", file);

    try {
      setUploading(true);
      await upload(formData);
      toast.success("Post Uploaded Successfully 😃", {
        style: {
          background: "green",
          color: "white",
          fontSize: "20px",
          width: "auto",
        },
      });
      setForm({ description: "", hashtags: "" });
      setFile(null);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        style: {
          background: "red",
          color: "white",
          fontSize: "20px",
          width: "auto",
        },
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />

      <form className="fixed w-dvw " onSubmit={handleSubmit}>
        <main className="flex h-dvh bg-[#6060db] w-full justify-center items-center ">
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
                    {file?.name || "Upload a file"}
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
                  onChange={handleFileChange}
                  className="absolute h-full w-full cursor-pointer opacity-0 "
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
                  {/* <span className="text-red-600 text-lg ml-1">*</span> */}
                </label>
                <textarea
                  name="description"
                  id="post-description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Add a description .."
                  className="w-full mt-3 h-full border-2 border-[#7474c5] rounded-md p-4 placeholder:font-Poppins-SemiBold placeholder:text-neutral-600 "
                ></textarea>
              </div>

              <div className="mt-17 flex flex-col">
                <label htmlFor="post-hashtags">
                  <span className="font-Poppins-Medium">Hashtags</span>
                  {/* <span className="text-red-600 text-lg ml-1">*</span> */}
                </label>
                <input
                  type="text"
                  id="post-hashtags"
                  name="hashtags"
                  value={form.hashtags}
                  onChange={handleChange}
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

              {/* {!user?.isVerified && <VerificationError />} */}

              <div className="mt-4 flex items-center justify-end">
                <button
                  type="submit"
                  // disabled={!user.isVerified}
                  className="bg-indigo-800 text-white text-xl p-4 rounded-lg mt-1 cursor-pointer transition-all active:bg-indigo-600 disabled:bg-gray-600 disabled:text-neutral-300 disabled:cursor-not-allowed "
                >
                  {uploading ? "Uploading..." : "Upload post"}
                </button>
              </div>
            </div>
          </section>
        </main>
      </form>
    </>
  );
};
export default UploadPage;
