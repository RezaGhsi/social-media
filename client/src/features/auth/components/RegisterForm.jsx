import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import CustomInput from "../../../shared/components/CustomInput";
import PasswordInput from "../../../shared/components/PasswordInput";
import { Check, X } from "lucide-react";

const RegisterForm = () => {
  const { register, loading, error, clearError, user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState("");

  const [strongPassword, setStrongPassword] = useState({ char8: false, containsWord: false, containsNumber: false, containsSymbol: false })

  useEffect(() => {
    if (user) {
      toast.success("Your Registration Was Successful", {
        style: {
          background: "green",
          color: "white",
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    clearError();
    setLocalError("");

    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (e.target.name === "password") {
      if (/[A-Za-z]/.test(e.target.value)) {
        setStrongPassword((prev) => ({ ...prev, containsWord: true }));
      } else { setStrongPassword((prev) => ({ ...prev, containsWord: false })) }

      if (e.target.value.length > 7) {
        setStrongPassword((prev) => ({ ...prev, char8: true }));
      }
      else { setStrongPassword((prev) => ({ ...prev, char8: false })) }

      if (/\d/.test(e.target.value)) {
        setStrongPassword((prev) => ({ ...prev, containsNumber: true }));
      }
      else { setStrongPassword((prev) => ({ ...prev, containsNumber: false })) }

      if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(e.target.value)) {
        setStrongPassword((prev) => ({ ...prev, containsSymbol: true }));
      }
      else { setStrongPassword((prev) => ({ ...prev, containsSymbol: false })) }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setLocalError("Confirm Password Has to be Equal to Password");
      return;
    }

    register(form);
  };

  const displayError = localError || error;
  if (displayError) {
    console.error(displayError);
    toast.error(displayError, {
      style: { background: "red", color: "white" },
    });
  }

  return (
    <section className="flex flex-col mt-12 md:mt-0 gap-7 md:max-w-80 lg:max-w-113.5 transition-colors ">
      <div className="flex flex-col gap-1.5 ">
        <h5 className="text-[#8060C5] text-xs font-Poppins-Medium ">YOUR NEXT LITTLE ADVENTURE</h5>
        <h2 className="text-4xl font-Poppins-SemiBold">Find your kind of people.</h2>
        <p className="text-neutral-500">Make room for everyday stories. Start with yours.</p>

        {displayError && (
          <h3 className="font-Poppins-SemiBold text-2xl max-w-100 text-red-600">
            {displayError}
          </h3>
        )}

      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <CustomInput value={form.name} label={"Full name"} name={"name"} placeholder="Enter your Full Name" handleChange={handleChange} />
        <div>
          <CustomInput value={form.username} label={"Username"} name={"username"} placeholder="Enter a Username" handleChange={handleChange} />
          <p className="text-xs text-neutral-500 mt-2">5+ characters. Your unique corner of nekoSocial. You can change it later.</p>
        </div>
        <CustomInput value={form.email} type="email" label={"Email address"} name={"email"} placeholder="Enter your Email address" handleChange={handleChange} />


        <PasswordInput value={form.password} label={"Password"} name={"password"} placeholder="Enter a Strong Password" handleChange={handleChange} />
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 justify-between *:w-full *:h-0.75 *:rounded-full *:transition-colors">
            <span className={`${strongPassword.containsWord ? "bg-purple-700" : "bg-gray-500"}`}></span>
            <span className={`${strongPassword.containsNumber ? "bg-purple-700" : "bg-gray-500"}`}></span>
            <span className={`${strongPassword.containsSymbol ? "bg-purple-700" : "bg-gray-500"}`}></span>
            <span className={`${strongPassword.char8 ? "bg-purple-700" : "bg-gray-500"}`}></span>
          </div>
          <div className="flex gap-1.5 items-center">
            {strongPassword.char8 && strongPassword.containsNumber && strongPassword.containsSymbol ?
              <Check strokeWidth={3} size={18} className="text-green-800" /> :
              <X strokeWidth={3} size={18} className="text-red-800" />
            }
            <p className="text-xs text-neutral-500">Strong password · 8+ characters, a number and a symbol</p>
          </div>

        </div>

        <PasswordInput value={form.confirmPassword} label={"Confirm password"} name={"confirmPassword"} placeholder="Enter your Password Again" handleChange={handleChange} />

        <p className="text-xs text-neutral-500">By creating an account, you agree to our Terms of Service and Privacy Policy. Be kind. Be yourself.</p>

        <button
          disabled={loading}
          type="submit"
          className={`h-11.5 px-5 w-full disabled:cursor-not-allowed cursor-pointer rounded-2xl bg-[#8060C5] text-white active:bg-purple-800 disabled:bg-purple-950/40`}
        >
          {loading ? "Creating your account ..." : "Create account"}
        </button>
      </form>
      <div className="flex justify-center text-sm gap-1">
        <p className="text-neutral-500">Already part of the community?</p>
        <a href="/login" className="font-Poppins-Medium text-[#8060C5] ">Log in</a>
      </div>
    </section>
  );
};

export default RegisterForm;
