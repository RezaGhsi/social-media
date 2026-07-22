import { HiOutlinePencil } from "react-icons/hi2";
import { CiWarning } from "react-icons/ci";
import { ImSpinner } from "react-icons/im";
import InfoInput from "../components/InfoInput";
import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import AvatarImg from "../components/AvatarImg";
import { updateUserAvatar, updateUserInfo } from "../api/userApi";
import { toast } from "sonner";
import PasswordForm from "../components/PasswordForm";
import LogoutBtn from "../components/LogoutBtn";
import Btn from "../../../shared/components/Btn";
import SuccessToast from "../../../shared/components/SuccessToast";
import ErrorToast from "../../../shared/components/ErrorToast";
("./../components/InfoInput");

const ProfileUpdate = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: user?.name,
    bio: user?.biography,
    username: user?.username,
    email: user?.email,
    birthDate: user.birthDate?.split("T")[0] || "",
    info: user?.address?.info,
    city: user?.address?.city,
    postalCode: user?.address?.postalCode,
    country: user?.address?.country,
  });

  const [userAvatar, setUserAvatar] = useState(user.avatarUrl);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("Edit Profile");

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
    user?.address?.info !== form.info ||
    user?.address?.city !== form.city ||
    user?.address?.postalCode != form.postalCode ||
    user?.address?.country !== form.country;

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
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#E6ECF6] transition-colors">
      <div className="font-Poppins-SemiBold mt-20 mb-3 flex w-[70dvw] justify-start text-xl text-indigo-700">
        <a href="/">Back to home </a>
      </div>

      <section className="m-10 mt-0 mb-20 w-[70dvw] rounded-lg bg-white p-4 pb-12 shadow-2xl shadow-black/15">
        <header className="font-Poppins-SemiBold mt-5 ml-4 flex gap-6 *:cursor-pointer *:px-3 *:pb-3">
          <button
            name="Edit Profile"
            onClick={handelTabChange}
            className={`${activeTab === "Edit Profile" ? "border-b-3 text-purple-800" : ""}`}
          >
            Edit Profile
          </button>
          <button
            name="Preferences"
            onClick={handelTabChange}
            className={`${activeTab === "Preferences" ? "border-b-3 text-purple-800" : ""}`}
          >
            Preferences
          </button>
          <button
            name="Security"
            onClick={handelTabChange}
            className={`${activeTab === "Security" ? "border-b-3 text-purple-800" : ""}`}
          >
            Security
          </button>
        </header>

        <hr className="mx-10 mb-10 text-neutral-200" />

        {activeTab === "Edit Profile" && (
          <main className="relative ml-4 flex gap-6">
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
                  placeholder={"full name"}
                />

                <InfoInput
                  name={"bio"}
                  label={"Biography"}
                  type={"text-area"}
                  value={form.bio}
                  handleChange={handleChange}
                  placeholder={"bio"}
                />

                <InfoInput
                  name={"username"}
                  label={"Username"}
                  type={"text"}
                  value={form.username}
                  handleChange={handleChange}
                  placeholder={"username"}
                />

                <InfoInput
                  name={"email"}
                  label={"Email Address"}
                  type={"email"}
                  value={form.email}
                  handleChange={handleChange}
                  placeholder={"email"}
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
                  placeholder={"birth date"}
                />

                <InfoInput
                  name={"country"}
                  label={"Country"}
                  type={"country"}
                  value={form.country}
                  handleChange={handleChange}
                  placeholder={"country"}
                />

                <InfoInput
                  name={"city"}
                  label={"City"}
                  type={"city"}
                  value={form.city}
                  handleChange={handleChange}
                  placeholder={"city"}
                />

                <InfoInput
                  name={"info"}
                  label={"Present Address"}
                  type={"address"}
                  value={form.info}
                  handleChange={handleChange}
                  placeholder={"address"}
                />

                <InfoInput
                  name={"postalCode"}
                  label={"Postal Code"}
                  type={"text"}
                  value={form.postalCode}
                  handleChange={handleChange}
                  placeholder={"postalCode"}
                />
              </section>

              <div className="mr-28 flex justify-end">
                <Btn
                  onClick={handleSubmit}
                  disabled={submitDisabled || !isValuesChanged}
                  color={"blue"}
                  value={"Save Changes"}
                />
              </div>
            </section>
          </main>
        )}
        {activeTab === "Security" && (
          <main className="ml-4 flex h-full flex-col gap-6">
            <PasswordForm />

            <div className="font-Poppins-SemiBold flex items-center justify-between rounded-lg border border-red-200 bg-red-100/70 p-3 px-6">
              <h4 className="flex items-center gap-2">
                <span>
                  <CiWarning className="text-xl text-red-500" />
                </span>
                Log Out of Your Account
              </h4>
              <LogoutBtn />
            </div>
          </main>
        )}
      </section>
    </div>
  );
};
export default ProfileUpdate;
