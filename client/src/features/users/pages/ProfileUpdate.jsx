import { HiOutlinePencil } from "react-icons/hi2";
import { ImSpinner } from "react-icons/im";
import { FaSpinner } from "react-icons/fa";
import InfoInput from "../components/InfoInput";
import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import AvatarImg from "../components/AvatarImg";
import { updateUserAvatar, updateUserInfo } from "../api/userApi";
import { toast } from "sonner";
("./../components/InfoInput");

const ProfileUpdate = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    birthDate: user.birthDate?.split("T")[0] || "",
    info: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [userAvatar, setUserAvatar] = useState(user.avatarUrl);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      return toast.error("File Type is Not Invalid");

    avatarFormData.append("avatar", file);

    const uploadAvatar = async (avatarFormData) => {
      try {
        setUploading(true);
        const { data } = await updateUserAvatar(
          avatarFormData,
          setUploadProgress,
        );
        setUserAvatar(data.user.avatarUrl);

        toast.success(data.message, {
          style: { background: "green", color: "white" },
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    };
    uploadAvatar(avatarFormData);
  };

  const handleSubmit = () => {
    const updateInfo = async (info) => {
      try {
        Object.keys(info).forEach((key) =>
          !info[key] ? (info[key] = undefined) : "",
        );

        const { data } = await updateUserInfo(info);
        toast.success(data.message, {
          style: { background: "green", color: "white" },
        });
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    updateInfo(form);
  };

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-[#E6ECF6] transition-colors">
      <div className="font-Poppins-SemiBold mt-10 mb-3 flex w-[70dvw] justify-start text-xl text-indigo-700">
        <a href="/">Back to home </a>
      </div>

      <section className="m-10 mt-0 w-[70dvw] rounded-lg bg-white p-4 pb-14 shadow-2xl shadow-black/15">
        <header className="font-Poppins-SemiBold mt-5 ml-4 flex gap-6 *:cursor-pointer *:px-3 *:pb-3">
          <button className="border-b-3 text-purple-800">Edit profile</button>
          <button>Preferences</button>
          <button>Security</button>
        </header>

        <hr className="mx-10 mb-10 text-neutral-200" />

        <main className="relative ml-4 flex h-[75%] gap-6">
          <section className="">
            <div className="h-36 w-36 overflow-hidden rounded-full">
              <AvatarImg avatarUrl={userAvatar} />
            </div>
            <div className="absolute top-27 left-27 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700">
              <input
                type="file"
                accept=".jpg,.jpeg,.webp,.png"
                className="absolute h-full w-full rounded-full opacity-0"
                onChange={handlePfpChange}
              />
              <HiOutlinePencil className="text-xl text-white" />
            </div>
            <div
              className={`flex items-center justify-center gap-2 ${uploading ? "visible" : "hidden"}`}
            >
              <ImSpinner className="animate-spin" />
              Uploading
              <span>{uploadProgress}%</span>
            </div>
          </section>

          <section className="pb-8">
            <section className="flex h-full w-full flex-wrap *:mb-5 md:flex-col md:flex-nowrap lg:flex-row lg:flex-wrap">
              <InfoInput
                name={"name"}
                label={"Full Name"}
                type={"text"}
                value={form.name}
                handleChange={handleChange}
                placeholder={user?.name || "full name"}
              />

              <InfoInput
                name={"username"}
                label={"Username"}
                type={"text"}
                value={form.username}
                handleChange={handleChange}
                placeholder={user?.username || "username"}
              />

              <InfoInput
                name={"email"}
                label={"Email Address"}
                type={"email"}
                value={form.email}
                handleChange={handleChange}
                placeholder={user?.email || "email"}
              />

              {/* <InfoInput
                name={"password"}
                label={"Password"}
                type={"password"}
                value={form.password}
                handleChange={handleChange}
                placeholder={user?.password || "password"}
              /> */}

              <InfoInput
                name={"birthDate"}
                label={"Date of Birth"}
                type={"date"}
                value={form.birthDate}
                handleChange={handleChange}
                placeholder={user?.birthDate || "birth date"}
              />

              <InfoInput
                name={"country"}
                label={"Country"}
                type={"country"}
                value={form.country}
                handleChange={handleChange}
                placeholder={user?.address?.country || "country"}
              />

              <InfoInput
                name={"city"}
                label={"City"}
                type={"city"}
                value={form.city}
                handleChange={handleChange}
                placeholder={user?.address?.city || "city"}
              />

              <InfoInput
                name={"info"}
                label={"Present Address"}
                type={"address"}
                value={form.address}
                handleChange={handleChange}
                placeholder={user?.address?.info || "address"}
              />

              <InfoInput
                name={"postalCode"}
                label={"Postal Code"}
                type={"text"}
                value={form.postalCode}
                handleChange={handleChange}
                placeholder={user?.address?.postalCode || "postalCode"}
              />
            </section>

            <div className="mr-28 flex justify-end">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={submitDisabled}
                className="cursor-pointer rounded-lg bg-blue-700 px-4 py-3 text-white hover:bg-blue-600 active:bg-blue-900"
              >
                Save changes
              </button>
            </div>
          </section>
        </main>
      </section>
    </div>
  );
};
export default ProfileUpdate;
