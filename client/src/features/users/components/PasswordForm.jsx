import { useState } from "react";
import PasswordInput from "./../../../shared/components/PasswordInput";
import { changePassRequest } from "../../auth/api/authApi";
import { toast } from "sonner";
import successToast from "../../../shared/components/SuccessToast";
import ErrorToast from "../../../shared/components/ErrorToast";
import { Check, ShieldCheck, X } from "lucide-react";
import CustomInput from "../../../shared/components/CustomInput";

const PasswordForm = () => {
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswordForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (passwordForm.newPassword === passwordForm.password) {
      return ErrorToast("New Password Can't be the Same as Your Old Password");
    }
    const changePassword = async (passwordForm) => {
      setLoading(true);
      const toastID = "passChangeLoadingToast";
      toast.loading("Changing Your Password", { id: toastID });
      try {
        const { data } = await changePassRequest(passwordForm);
        successToast(data.message);
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        ErrorToast(error.response.data.message);
      } finally {
        toast.dismiss(toastID);
        setLoading(false);
      }
    };
    changePassword(passwordForm);
  };

  const isSubmitDisabled =
    passwordForm.newPassword !== passwordForm.confirmPassword ||
    passwordForm.password.length < 8 ||
    passwordForm.newPassword.length < 8 ||
    passwordForm.confirmPassword.length < 8;

  // const isValidLength = passwordForm.newPassword.length > 8;

  return (
    <div className="bg-white flex flex-col gap-7 rounded-3xl md:p-7 p-5">
      <h3 className="text-xl font-Poppins-Medium flex gap-2.5 items-center"><span className="text-violet-900/70"><ShieldCheck size={22} /></span>Change password</h3>
      <p className="text-sm text-neutral-500">Keep your little corner of the internet safe.</p>

      <PasswordInput
        name={"password"}
        label={"Current Password"}
        value={passwordForm.password}
        handleChange={handleChange}
        placeholder={"current password"}
      />
      <form className="grid md:grid-cols-2 gap-5">

        <div className="flex flex-col gap-2">
          <CustomInput
            name={"newPassword"}
            label={"New Password"}
            value={passwordForm.newPassword}
            handleChange={handleChange}
            placeholder={"new password"}
          />
          <span className="text-xs text-neutral-400 flex gap-1">{passwordForm.newPassword.length > 7 ? <Check color="green" size={14} /> : <X color="red" size={14} />}At least 8 characters</span>
        </div>
        <div className="flex flex-col gap-2">
          <CustomInput
            name={"confirmPassword"}
            label={"Confirm New Password"}
            value={passwordForm.confirmPassword}
            handleChange={handleChange}
            placeholder={"confirm new password"}
          />
          <p className="text-xs text-neutral-400 flex gap-1">{passwordForm.newPassword === passwordForm.confirmPassword && passwordForm.confirmPassword.length > 7 ? <Check color="green" size={14} /> : <X color="red" size={14} />}Confirm password equal to new password.</p>
        </div>
      </form>
      <p className="text-sm text-neutral-500">Use at least 8 characters, including a number and a symbol. Choose a password you don’t use elsewhere.</p>
      <div className="mt-1 flex justify-end">
        <button
          color={"blue"}
          disabled={isSubmitDisabled || loading}
          onClick={handleSubmit}
          className="flex w-full lg:w-auto px-5 h-12 items-center cursor-pointer justify-center rounded-xl text-violet-900/75 bg-violet-900/10 transition-colors hover:bg-violet-900/12 active:bg-violet-900/20 disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
        >
          Update password
        </button>
      </div>
    </div>
  );
};
export default PasswordForm;
