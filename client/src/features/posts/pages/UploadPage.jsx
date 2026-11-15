import { useState } from "react";
import { upload } from "../api/postApi";
import { toast } from "sonner";
import ActionsSidebar from './../../../shared/components/ActionsSidebar'
import VerificationError from "../../../shared/components/VerificationError";
import AvatarImg from "../../users/components/AvatarImg";
import { useAuth } from "../../auth";
import { ArrowUpRight, Image, Upload } from "lucide-react";
import MobileNav from "../../../shared/components/MobileNav";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ description: "", hashtags: "" });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState(null);

  const { user, isInitializing } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected || !selected.type.startsWith("image/")) return;
    setFile(selected);

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(selected));
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
      await upload(formData, setUploadProgress);
      toast.success("Post Uploaded Successfully 😃", {
        style: {
          background: "green",
          color: "white",
          fontSize: "20px",
          width: "auto",
        },
      });
      setForm({ description: "", hashtags: "" });
      setPreview(null);
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

  console.log(file);

  return (
    <div className="flex bg-[#F7F7FA] items-center flex-col">
      <main className="flex gap-8 justify-center w-7xl max-w-full shrink md:p-8 px-4">

        <ActionsSidebar activeTab="none" />

        <div className="flex flex-col gap-6 max-w-full mt-4 md:mt-0 shrink flex-1">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm text-violet-900/70 font-Poppins-SemiBold">CREATE POST</h3>
            <h2 className="text-3xl font-Poppins-SemiBold">Share a little moment.</h2>
            <p className="text-neutral-500">Big adventures or the everyday. There’s room for it all.</p>
          </div>
          <section className="bg-white flex flex-col gap-7 rounded-3xl md:p-7 p-5">
            <header className="flex w-full items-center gap-3">
              {isInitializing ?
                <div className="w-10 h-10 rounded-full bg-neutral-300 animate-pulse"></div>
                :
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <AvatarImg avatarUrl={user?.avatarUrl} />
                </div>
              }
              {isInitializing ?
                <div className="flex flex-col gap-2 *:bg-neutral-300 *:rounded-full *:animate-pulse *:h-2.5">
                  <span className="w-20"></span>
                  <span className="w-15"></span>
                </div>
                :
                <div className="flex flex-col">
                  <span className="font-Poppins-SemiBold">{user?.name}</span>
                  <span className="text-neutral-500 text-sm">@{user?.username}</span>
                </div>
              }
            </header>

            <form className="lg:flex-row lg:justify-between gap-7 justify-start lg:items-start items-center flex flex-col" preventDefault >
              <section className="max-w-full flex-1 gap-3.5 shrink flex flex-col">
                <span className="font-Poppins-SemiBold">Your photo</span>
                {preview ?
                  <img src={preview} className="rounded-2xl flex max-w-full w-117.5 max-h-full object-cover md:h-100 h-75 shrink" />
                  :
                  <label htmlFor="file-upload" className="flex flex-col gap-4 border-2 border-neutral-200 text-2xl w-full rounded-2xl hover:bg-violet-800/8 active:bg-violet-800/15 cursor-pointer transition-colors text-violet-900/75 font-Poppins-Medium  md:h-100 h-75 justify-center items-center"><Upload size={90} />Choose a photo</label>
                }

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image className="text-violet-900/75" />
                    <div className="flex flex-col">
                      <span className="font-Poppins-Medium text-sm truncate max-w-50 block">
                        {file ? file.name : "No file selected"}
                      </span>
                      {preview && <span className="text-xs text-neutral-500">{file ? (file.size / 1024 / 1024).toFixed(2) : ""} MB</span>}
                    </div>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                    />
                  </div>
                  <label htmlFor="file-upload" className={`cursor-pointer text-violet-900/75 font-Poppins-SemiBold text-xs ${preview ? "" : "hidden"}`}>
                    Change
                  </label>
                </div>

                <label htmlFor="file-upload" className="flex w-full rounded-xl gap-2 hover:bg-violet-800/15 active:bg-violet-800/25 cursor-pointer transition-colors text-violet-900/75 font-Poppins-Medium bg-violet-700/8 h-11.5 justify-center items-center"><Upload size={20} />{preview ? "Choose another photo" : "Choose a photo"}</label>
                <p className="text-xs text-neutral-400">JPG, PNG or WEBP · Up to 20 MB. One photo, a thousand little details.</p>

              </section>

              <section className="w-full flex-1 mt-0 lg:mt-10 shrink gap-6 flex flex-col">
                <div className="flex w-full flex-col font-Poppins-Medium gap-1">
                  <label htmlFor="post-description">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="post-description"
                    value={form.description}
                    onChange={handleChange}
                    maxLength={800}
                    placeholder="Add a description .."
                    className="w-full border-2 border-neutral-200 font-Poppins-Regular rounded-xl p-3.5 h-26 text-sm resize-none outline-none focus:border-violet-800/30 "
                  />
                  <span className="text-xs text-neutral-500 font-Poppins-Regular">{form.description.length} / 800 characters</span>
                </div>


                <div className="flex flex-col font-Poppins-Medium gap-1">
                  <label htmlFor="post-hashtags">
                    Hashtags
                  </label>
                  <input
                    type="text"
                    name="hashtags"
                    id="post-hashtags"
                    value={form.hashtags}
                    onChange={handleChange}
                    maxLength={200}
                    placeholder="nature, edit, trend, explore, ne..."
                    className="w-full border-2 border-neutral-200 rounded-xl p-3 text-sm resize-none outline-none focus:border-violet-800/30 "
                  />
                  <span className="text-xs text-neutral-500 font-Poppins-Regular">Add a # before each tag so your people can find it.</span>
                </div>

                {/* {!user?.isVerified && <VerificationError />} */}

              </section>
            </form>
            <div className="">
              <hr className="text-neutral-300" />
              <div className="mt-6 flex gap-3 lg:flex-row flex-col items-center justify-between">
                <p className="text-xs text-neutral-400">A little kindness goes a long way. Share thoughtfully.</p>
                <button
                  onClick={handleSubmit}
                  // disabled={!user.isVerified || uploading}
                  className="flex gap-2 px-5 h-12 items-center cursor-pointer justify-center rounded-xl bg-violet-900/75 text-white transition-colors hover:bg-violet-900/70 active:bg-violet-900/90 lg:w-auto w-full"
                >
                  {uploading
                    ? `Uploading... ${uploadProgress}%`
                    : <span className="flex gap-2 items-center"><ArrowUpRight size={20} />Publish post</span>
                  }
                </button>
              </div>
            </div>
          </section>
        </div>

      </main>
      <MobileNav activeTab="create" />
    </div>
  );
};
export default UploadPage;
