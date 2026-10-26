import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomInput from "../../../shared/components/CustomInput";
import PasswordInput from "../../../shared/components/PasswordInput";

const RegisterForm = () => {
  const { login, loading, error, clearError, user } = useAuth();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const [keepSignedIn, setKeepSignedIn] = useState(false)

  const isValidForm = form.identifier === "" || form.password === "" || form.identifier.length < 5 || form.password.length < 8

  const location = useLocation();
  const redirectTo = location.state?.from?.pathname;

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (user) {
      toast.success("Login Successful", {
        style: { background: "green", color: "white" },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    clearError();
    setLocalError("");

    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(form, redirectTo);
  };

  const displayError = localError || error;
  if (displayError) {
    console.error(displayError);
    toast.error("Login Failed", {
      style: { background: "red", color: "white" },
    });
  }

  return (
    <section className="flex flex-col mt-12 md:mt-22 gap-7 max-w-113.5 transition-colors ">
      <div className="flex flex-col gap-1.5 ">
        <h5 className="text-[#8060C5] text-xs font-Poppins-Medium ">MAKE YOURSELF AT HOME</h5>
        <h2 className="text-4xl font-Poppins-SemiBold">Hey, welcome back.</h2>
        <p className="text-neutral-500">Your people and your little moments are waiting.</p>

        {displayError && (
          <h3 className="font-Poppins-SemiBold text-2xl max-w-100 text-red-600">
            {displayError}
          </h3>
        )}

      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <CustomInput value={form.identifier} label={"Email or Username"} name={"identifier"} placeholder="Enter your Email or Username" handleChange={handleChange} />

        <PasswordInput value={form.password} label={"Password"} name={"password"} placeholder="Enter your Password" handleChange={handleChange} />


        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="flex gap-1">
            <input type="checkbox" name="keepSignedIn" id="keepSignedIn" onChange={() => setKeepSignedIn(!keepSignedIn)} value={keepSignedIn} className="cursor-pointer w-4" />
            <label className="cursor-pointer " htmlFor="keepSignedIn">Keep me signed in</label>
          </div>

          <a href="#" className="text-[#8060C5] font-Poppins-Medium active:text-purple-800 active:underline cursor-pointer ">Forgot password?</a>
        </div>

        <button
          disabled={loading || isValidForm}
          type="submit"
          className={`h-11.5 px-5 w-full disabled:cursor-not-allowed cursor-pointer rounded-2xl bg-[#8060C5] text-white active:bg-purple-800 disabled:bg-purple-950/40`}
        >
          {loading ? "Logging you in ..." : "Log in"}
        </button>
      </form>
      <div className="flex justify-center text-sm gap-1">
        <p className="text-neutral-500">New around here?</p>
        <a href="/register" className="font-Poppins-Medium text-[#8060C5] ">Create an account</a>
      </div>
    </section>
  );
};

export default RegisterForm;
