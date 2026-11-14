import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import AvatarImg from "../components/AvatarImg";
import { updateUserAvatar, updateUserInfo } from "../api/userApi";
import { toast } from "sonner";
import PasswordForm from "../components/PasswordForm";
import LogoutBtn from "../components/LogoutBtn";
import SuccessToast from "../../../shared/components/SuccessToast";
import ErrorToast from "../../../shared/components/ErrorToast";
import { Camera, Loader, User2 } from "lucide-react";
import ActionsSidebar from "../../../shared/components/ActionsSidebar";
import CustomInput from "../../../shared/components/CustomInput";
("./../components/InfoInput");

const ProfileUpdate = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: user?.name,
    bio: user?.biography,
    username: user?.username,
    email: user?.email,
    birthDate: user.birthDate?.split("T")[0] || "",
    country: user?.country,
    website: user?.website,
  });

  const [userAvatar, setUserAvatar] = useState(user.avatarUrl);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("Account info");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handelTabChange = (e) => {
    setActiveTab(e.target.name);
  };

  const isValuesChanged =
    user?.name !== form.name ||
    user?.biography !== form.bio ||
    user?.username !== form.username ||
    user?.email !== form.email ||
    user?.birthDate?.split("T")[0] !== form.birthDate ||
    user?.website !== form.website ||
    user?.country !== form.country;

  const handlePfpChange = (e) => {
    const avatarFormData = new FormData();
    const file = e.target.files[0];

    const allowedFileTypes = [
      "image/jpg",
      "image/jpeg",
      "image/webp",
      "image/png",
    ];
    if (!allowedFileTypes.includes(file.type))
      return ErrorToast("File Type is Not Invalid");

    avatarFormData.append("avatar", file);

    const uploadAvatar = async (avatarFormData) => {
      try {
        setUploading(true);
        const { data } = await updateUserAvatar(
          avatarFormData,
          setUploadProgress,
        );
        setUserAvatar(data.user.avatarUrl);

        SuccessToast(data.message);
      } catch (error) {
        console.log(error);
        ErrorToast(error.response.data.message);
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    };
    uploadAvatar(avatarFormData);
  };

  const handleSubmit = () => {
    setSubmitDisabled(true);
    const toastID = "savingChangesToast";
    toast.loading("Saving Changes", { id: toastID });
    const updateInfo = async (info) => {
      try {
        Object.keys(info).forEach((key) =>
          !info[key] ? (info[key] = undefined) : "",
        );

        const { data } = await updateUserInfo(info);
        SuccessToast(data.message);
        setTimeout(() => window.location.reload(), 1500);
      } catch (error) {
        ErrorToast(error.response?.data?.message);
      } finally {
        toast.dismiss(toastID);
      }
    };
    updateInfo(form);
  };

  return (
    <div className="flex bg-[#F7F7FA] items-center flex-col">
      <main className="flex gap-8 justify-center w-7xl max-w-full shrink md:p-8 px-4">

        <ActionsSidebar />


        <div className="flex flex-col gap-6 max-w-full mt-4 md:mt-0 shrink flex-1">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-sm text-violet-900/70 font-Poppins-SemiBold">Edit account</h2>
            <h2 className="text-3xl font-Poppins-SemiBold">Make it feel like you.</h2>
            <p className="text-neutral-500">A few details to help your people find you.</p>
          </div>
          <header className="flex gap-8 *:cursor-pointer *:transition-colors">
            <button
              name="Account info"
              onClick={handelTabChange}
              className={`${activeTab === "Account info" ? "font-Poppins-SemiBold text-violet-900/70" : "text-neutral-500"}`}
            >
              Account info
            </button>
            <button
              name="Security"
              onClick={handelTabChange}
              className={`${activeTab === "Security" ? "font-Poppins-SemiBold text-violet-900/70" : "text-neutral-500"}`}
            >
              Security
            </button>

          </header>

          {activeTab === "Account info" && (
            <section className="bg-white flex flex-col gap-7 rounded-3xl md:p-7 p-5">

              <h3 className="text-xl font-Poppins-Medium flex gap-2.5 items-center"><span className="text-violet-900/70"><User2 size={22} /></span>Account information</h3>

              <form preventDefault className="lg:justify-between gap-7 w-full justify-start lg:items-start items-center flex flex-col">
                <section className="w-full gap-6 flex flex-col items-center lg:flex-row">
                  <div className="flex flex-col lg:w-55 w-full p-5 text-sm font-Poppins-Medium gap-3.5 bg-violet-900/8 rounded-xl items-center ">
                    <span>Profile photo</span>

                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <AvatarImg avatarUrl={userAvatar} />
                    </div>

                    <label htmlFor="pfp-photo" className="flex cursor-pointer transition-colors px-5 justify-center items-center h-11.5 gap-2 bg-violet-900/10 rounded-xl text-violet-800/80 active:bg-violet-900/20">
                      {!uploading && <span><Camera /></span>}
                      {uploading ? <span className="flex gap-2 items-center"><Loader size={20} className="animate-spin" /> Uploading {uploadProgress}%</span> : "Change photo"}
                      <input
                        type="file"
                        name="pfp-photo"
                        id="pfp-photo"
                        onChange={handlePfpChange}
                        accept=".jpg,.jpeg,.webp,.png"
                        hidden
                      />
                    </label>

                    <span className="text-xs text-neutral-400 font-Poppins-Regular">JPG or PNG · Up to 5 MB</span>
                  </div>

                  <div className="flex flex-col w-full lg:flex-1 lg:shrink gap-3.5 font-Poppins-Medium text-sm">
                    <span>Banner photo</span>
                    <div className="rounded-2xl overflow-hidden w-full h-35 md:h-44.5"><img src="/images/Photo.png" alt="Banner photo" className="object-cover h-full w-full" /></div>
                    <div className="flex justify-between">
                      <span className="text-xs text-neutral-400 font-Poppins-Regular">Recommended: 1600 × 600</span>
                      <label htmlFor="banner-photo" className="text-violet-800/80 cursor-pointer transition-colors active:text-violet-800/60"><input type="file" name="banner-photo" id="banner-photo" hidden />Change banner</label>
                    </div>
                  </div>
                </section>

                <section className="max-w-full w-full flex flex-col gap-7 flex-1 shrink">
                  <div className="grid md:grid-cols-2 w-full gap-y-7 gap-x-5">
                    <CustomInput
                      name={"name"}
                      label={"Full Name"}
                      type={"text"}
                      value={form.name}
                      handleChange={handleChange}
                      placeholder={"full name"}
                    />

                    <CustomInput
                      name={"username"}
                      label={"Username"}
                      type={"text"}
                      value={form.username}
                      handleChange={handleChange}
                      placeholder={"username"}
                    />


                    <CustomInput
                      name={"email"}
                      label={"Email Address"}
                      type={"email"}
                      value={form.email}
                      handleChange={handleChange}
                      placeholder={"email"}
                    />

                    <div className="flex flex-col gap-2">
                      <CustomInput
                        name={"birthDate"}
                        label={"Date of Birth"}
                        type={"date"}
                        value={form.birthDate}
                        handleChange={handleChange}
                        placeholder={"birth date"}
                      />
                      <span className="text-xs text-neutral-500">Your birthday stays private.</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <textarea
                      name={"bio"}
                      label={"Biography"}
                      type={"textarea"}
                      value={form.bio}
                      onChange={handleChange}
                      placeholder={"bio"}
                      className="h-26 resize-none outline-purple-200 w-full min-w-40 border bg-white border-neutral-300 rounded-xl p-3.5"
                    />
                    <span className="text-xs text-neutral-500">{form.bio.length} / 160 characters</span>
                  </div>

                  <div className="grid md:grid-cols-2 w-full gap-y-7 gap-x-5">

                    <CustomInput
                      name={"website"}
                      label={"Website address"}
                      type={"url"}
                      value={form.website}
                      handleChange={handleChange}
                      placeholder={"your website address"}
                    />

                    <CustomInput
                      name={"country"}
                      label={"Country"}
                      type={"country"}
                      value={form.country}
                      handleChange={handleChange}
                      placeholder={"country"}
                    />
                  </div>


                </section>
              </form>

              <div className="flex flex-col lg:flex-row gap-7 justify-between items-center">
                <p className="text-xs text-neutral-500">Your name, bio and website appear on your profile.</p>
                <button
                  onClick={handleSubmit}
                  disabled={submitDisabled || !isValuesChanged}
                  className="flex w-full lg:w-auto px-5 h-12 items-center cursor-pointer justify-center rounded-xl bg-violet-900/75 text-white transition-colors hover:bg-violet-900/70 active:bg-violet-900/90 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >Save Changes</button>
              </div>

            </section>
          )}
          {activeTab === "Security" && (
            <section className="flex flex-col gap-7 rounded-3xl">
              <PasswordForm />
              <div className="bg-white flex lg:flex-row flex-col justify-between gap-7 rounded-3xl md:p-7 p-5">
                <h4 className="flex flex-col text-xl font-Poppins-Medium gap-2">
                  See you soon?
                  <span className="text-xs font-Poppins-Regular text-neutral-500">
                    You’re signed in as @{user?.username}. Logging out only ends this session.
                  </span>
                </h4>
                <LogoutBtn />
              </div>
            </section>
          )}
        </div>
      </main>

    </div>
  );
};
export default ProfileUpdate;
