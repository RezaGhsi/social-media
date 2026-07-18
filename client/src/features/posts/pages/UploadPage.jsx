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
    <div className="flex h-dvh flex-col">
      <Header />

      <form className="flex-1" onSubmit={handleSubmit}>
        <main className="flex h-full w-full items-center justify-center bg-[#6060db] p-10">
          <section className="flex w-[95dvw] items-center justify-between gap-6 rounded-xl bg-white p-16 py-20 shadow-[12px]">
            <div className="ml-8 h-full w-[50%]">
              <h3 className="font-Poppins-SemiBold text-5xl text-indigo-600">
                File upload
              </h3>

              <div className="relative mt-5 flex w-[80%] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-800 bg-[#cecefd] text-indigo-800">
                <span className="mt-12 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-[50%] w-[50%]"
                  >
                    <path d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" />
                  </svg>
                </span>
                <div>
                  <p className="font-Poppins-Medium mt-10 text-3xl">
                    {file?.name || "Upload a file"}
                  </p>
                </div>
                <p
                  className="font-Poppins-Bold mt-10 mb-12 rounded-lg bg-indigo-800 p-4 text-3xl text-white"
                  id="browse-files"
                >
                  Browse file
                </p>

                <input
                  type="file"
                  id="file-upload-input"
                  accept="video/*, image/*"
                  onChange={handleFileChange}
                  className="absolute h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </div>

            <div className="post-upload-box h-full w-[50%] transition-all">
              <h3 className="file-upload-title font-Poppins-SemiBold text-5xl text-indigo-800">
                Post details
              </h3>

              <div className="mt-6 h-40 w-full">
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
                  className="placeholder:font-Poppins-SemiBold mt-3 h-full w-full rounded-md border-2 border-[#7474c5] p-4 placeholder:text-neutral-600"
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
                  className="placeholder:font-Poppins-SemiBold mt-3 rounded-md border-2 border-[#7474c5] p-3 placeholder:text-neutral-600"
                />
                <div
                  id="hashtags-wrap"
                  className="my-2 flex items-center gap-2 text-sm"
                ></div>
                <span className="font-Poppins-Medium text-sm">
                  Split the hashtags with comma ( , )
                </span>
              </div>

              {/* {!user?.isVerified && <VerificationError />} */}

              <div className="mt-4 flex items-center justify-end">
                <button
                  type="submit"
                  // disabled={!user.isVerified}
                  className="mt-1 cursor-pointer rounded-lg bg-indigo-800 p-4 text-xl text-white transition-all active:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-neutral-300"
                >
                  {uploading ? "Uploading..." : "Upload post"}
                </button>
              </div>
            </div>
          </section>
        </main>
      </form>
    </div>
  );
};
export default UploadPage;
