import { useState } from "react";
import Btn from "../../../shared/components/Btn";
import InfoInput from "./InfoInput";
import PasswordInput from "./PasswordInput";
import { changePassRequest } from "../../auth/api/authApi";
import { toast } from "sonner";
import successToast from "./../../../shared/components/SuccessToast";
import ErrorToast from "./../../../shared/components/ErrorToast";

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
        // setTimeout(() => window.location.reload(), 1500);
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
    <section className="flex flex-col rounded-lg border border-blue-200 p-6">
      <form className="relative flex flex-col *:mb-6">
        <PasswordInput
          name={"password"}
          label={"Current Password"}
          value={passwordForm.password}
          handleChange={handleChange}
          placeholder={"current password"}
        />

        {/* <h4
          className={`font-Poppins-Medium absolute top-23 left-30 text-sm ${isValidLength ? "text-green-500" : "text-red-500"}`}
        >
          Minimum 8 Characters {isValidLength ? "✔" : "🗙"}
        </h4> */}

        <InfoInput
          name={"newPassword"}
          label={"New Password"}
          value={passwordForm.newPassword}
          handleChange={handleChange}
          placeholder={"new password"}
          className="relative"
        />

        <InfoInput
          name={"confirmPassword"}
          label={"Confirm New Password"}
          value={passwordForm.confirmPassword}
          handleChange={handleChange}
          placeholder={"confirm new password"}
        />
      </form>
      <div className="mt-1 flex justify-end">
        <Btn
          color={"blue"}
          value={"Change Password"}
          disabled={isSubmitDisabled || loading}
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
};
export default PasswordForm;
