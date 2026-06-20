import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const RegisterForm = () => {
  const { register, loading, error, clearError, user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: Number(),
  });

  const [localError, setLocalError] = useState("");

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
    <form
      onSubmit={handleSubmit}
      className="w-[31.3dvw] p-[12px] rounded-[6px] "
    >
      <header>
        <h2 className="text-3xl font-Poppins-SemiBold mb-3 ">
          Get started now 🌌
        </h2>
        <div className="flex text-sm mt-1 text-gray-800 items-center gap-1">
          <span>Have an account?</span>
          <a href="/login" className="text-indigo-700 font-Poppins-SemiBold">
            Login
          </a>
        </div>

        <div>
          {displayError && (
            <h3 className="text-red-600 text-2xl font-Poppins-SemiBold mt-6 mb-[-20px]">
              {displayError}
            </h3>
          )}
        </div>
      </header>

      <main className="mt-8">
        <div className="relative ">
          <label htmlFor="name" className="font-Poppins-Medium">
            Full name
          </label>
          <div className="relative flex input-card items-center">
            <input
              id="name"
              type="text"
              className=" bg-[#00000012] h-[40px] w-[70%] text-[15px] rounded-[6px] pr-[24px] pl-[42px] mt-[8px] mb-4 placeholder:font-Poppins-SemiBold placeholder:text-[13px] outline-0 "
              placeholder="Please Enter Your Full Name..."
              required
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <span className="absolute left-2 top-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="relative ">
          <label htmlFor="age" className="font-Poppins-Medium">
            Age
          </label>
          <div className="relative flex input-card items-center">
            <input
              id="age"
              type="number"
              className=" bg-[#00000012] h-[40px] w-[70%] text-[15px] rounded-[6px] pr-[24px] pl-[42px] mt-[8px] mb-4 placeholder:font-Poppins-SemiBold placeholder:text-[13px] outline-0 "
              placeholder="Please Enter Your Full Name..."
              required
              name="age"
              value={form.age}
              onChange={handleChange}
            />

            <span className="absolute left-2 top-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="auth-input-card">
          <label htmlFor="username" className="font-Poppins-Medium">
            Username
          </label>
          <div className="relative flex input-card items-center">
            <input
              id="username"
              type="text"
              className=" bg-[#00000012] h-[40px] w-[70%] text-[15px] rounded-[6px] pr-[24px] pl-[42px] mt-[8px] mb-4 placeholder:font-Poppins-SemiBold placeholder:text-[13px] outline-0 "
              placeholder="Please Enter Your Username..."
              required
              name="username"
              value={form.username}
              onChange={handleChange}
            />

            <span className="absolute left-2 top-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
              </svg>
            </span>
          </div>
        </div>

        <div className="auth-input-card">
          <label htmlFor="email" className="font-Poppins-Medium">
            Email address
          </label>
          <div className="relative flex input-card items-center">
            <input
              id="email"
              type="email"
              className=" bg-[#00000012] h-[40px] w-[70%] text-[15px] rounded-[6px] pr-[24px] pl-[42px] mt-[8px] mb-4 placeholder:font-Poppins-SemiBold placeholder:text-[13px] outline-0 "
              placeholder="Please Enter Your Email Address..."
              required
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <span className="absolute left-2 top-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </span>
          </div>
        </div>

        <div className="auth-input-card">
          <label htmlFor="password" className="font-Poppins-Medium">
            Password
          </label>
          <div className="relative flex input-card items-center">
            <input
              id="password"
              type="password"
              className=" bg-[#00000012] h-[40px] w-[70%] text-[15px] rounded-[6px] pr-[24px] pl-[42px] mt-[8px] mb-4 placeholder:font-Poppins-SemiBold placeholder:text-[13px] outline-0 "
              placeholder="Please Enter Your Password..."
              required
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <span className="absolute left-2 top-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
              </svg>
            </span>
          </div>
        </div>
        <div className="auth-input-card">
          <label htmlFor="confirm-password" className="font-Poppins-Medium">
            Confirm Password
          </label>
          <div className="relative flex input-card items-center">
            <input
              id="confirm-password"
              type="password"
              className=" bg-[#00000012] h-[40px] w-[70%] text-[15px] rounded-[6px] pr-[24px] pl-[42px] mt-[8px] mb-4 placeholder:font-Poppins-SemiBold placeholder:text-[13px] outline-0 "
              placeholder="Please Enter Your Password Again..."
              required
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <span className="absolute left-2 top-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
              </svg>
            </span>
          </div>
        </div>
      </main>
      <footer className="mt-4">
        <button
          disabled={loading}
          type="submit"
          className="bg-indigo-700 text-white rounded-sm w-[70%] h-10 cursor-pointer active:bg-indigo-500 "
        >
          {loading ? "Signing You up ..." : "Continue"}
        </button>
      </footer>
    </form>
  );
};

export default RegisterForm;
