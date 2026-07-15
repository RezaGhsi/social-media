import { HiOutlinePencil } from "react-icons/hi2";
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
  console.log(user.birthDate);

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePfpChange = (e) => {
    const avatarFormData = new FormData();
    avatarFormData.append("avatar", e.target.files[0]);

    const uploadAvatar = async (avatarFormData) => {
      try {
        const { data } = await updateUserAvatar(avatarFormData);
        toast.success(data.message, {
          style: { background: "green", color: "white" },
        });
      } catch (error) {
        toast.error(error.response.data.message);
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
    <div className="w-full min-h-dvh flex flex-col items-center justify-center bg-[#E6ECF6] transition-colors ">
      <div className="flex justify-start w-[70dvw] mb-3 font-Poppins-SemiBold text-indigo-700 text-xl mt-10">
        <a href="/">Back to home </a>
      </div>

      <section className="bg-white w-[70dvw] m-10 mt-0 rounded-lg p-4 pb-14 shadow-2xl shadow-black/15 ">
        <header className="flex mt-5 ml-4 gap-6 font-Poppins-SemiBold *:pb-3 *:px-3 *:cursor-pointer">
          <button className="border-b-3 text-purple-800">Edit profile</button>
          <button>Preferences</button>
          <button>Security</button>
        </header>

        <hr className="mx-10 mb-10 text-neutral-200" />

        <main className="relative flex h-[75%] gap-6 ml-4">
          <section className="">
            <div className="w-36 h-36 rounded-full overflow-hidden">
              <AvatarImg avatarUrl={user.avatarUrl} />
            </div>
            <div className="absolute bg-blue-600 w-9 h-9 rounded-full flex justify-center items-center left-27 top-27 hover:bg-blue-500 active:bg-blue-700">
              <input
                type="file"
                accept=".jpg,.jpeg,.webp,.png"
                className="absolute opacity-0 w-full h-full rounded-full"
                onChange={handlePfpChange}
              />
              <HiOutlinePencil className="text-white text-xl" />
            </div>
          </section>

          <section className="pb-8 ">
            <section className="flex w-full h-full flex-wrap md:flex-col md:flex-nowrap lg:flex-row lg:flex-wrap *:mb-5">
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

            <div className="flex justify-end mr-28">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={submitDisabled}
                className="bg-blue-700 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-600 active:bg-blue-900"
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
