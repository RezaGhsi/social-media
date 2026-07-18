import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RegisterForm = () => {
  const { login, loading, error, clearError, user } = useAuth();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

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
    <form onSubmit={handleSubmit} className="w-[31.3dvw] rounded-md p-3">
      <header>
        <h2 className="font-Poppins-SemiBold mb-3 text-3xl">Welcome Back 🌞</h2>
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-800">
          <span>Don't Have an account?</span>
          <a href="/register" className="font-Poppins-SemiBold text-indigo-700">
            Register
          </a>
        </div>
        <div>
          {displayError && (
            <h3 className="font-Poppins-SemiBold mt-6 -mb-5 text-2xl text-red-600">
              {displayError}
            </h3>
          )}
        </div>
      </header>

      <main className="mt-8">
        <div className="auth-input-card">
          <label htmlFor="identifier" className="font-Poppins-Medium">
            Username or Email
          </label>
          <div className="input-card relative flex items-center">
            <input
              id="identifier"
              type="text"
              className="placeholder:font-Poppins-SemiBold mt-2 mb-4 h-10 w-[70%] rounded-md bg-[#00000012] pr-6 pl-10.5 text-[15px] outline-0 placeholder:text-[13px]"
              placeholder="Please Enter Your Email Address..."
              required
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
            />
            <span className="absolute top-4 left-2 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
              </svg>
            </span>
          </div>
        </div>

        <div className="auth-input-card">
          <label htmlFor="password" className="font-Poppins-Medium">
            Password
          </label>
          <div className="input-card relative flex items-center">
            <input
              id="password"
              type="password"
              className="placeholder:font-Poppins-SemiBold mt-2 mb-4 h-10 w-[70%] rounded-md bg-[#00000012] pr-6 pl-10.5 text-[15px] outline-0 placeholder:text-[13px]"
              placeholder="Please Enter Your Password..."
              required
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <span className="absolute top-4 left-2 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
              </svg>
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-sm">
          <span>Forget the password?</span>
          <span>
            <strong>
              <a href="#" className="text-indigo-700">
                recovery
              </a>
            </strong>
          </span>
        </div>
      </main>
      <footer className="mt-4">
        <button
          disabled={loading}
          type="submit"
          className="h-10 w-[70%] cursor-pointer rounded-sm bg-indigo-700 text-white active:bg-indigo-500"
        >
          {loading ? "Signing You up ..." : "Continue"}
        </button>
      </footer>
    </form>
  );
};

export default RegisterForm;
