import FormInput from "../components/FormInput";

const RegisterForm = () => {
  return (
    <form className="w-[31.3dvw] p-[12px] rounded-[6px] ">
      <header>
        <h2 className="text-3xl font-Poppins-SemiBold mb-3 ">
          Get started now 🌌
        </h2>
        <div className="flex text-sm mt-1 text-gray-800 items-center gap-1">
          <span>Have an account?</span>
          <a href="#" className="text-indigo-700 font-Poppins-SemiBold">
            Login
          </a>
        </div>
      </header>

      <main className="mt-10">
        <div className="relative mt-[8px] ">
          <label for="register_fullName" className="font-Poppins-Medium">
            Full name
          </label>
          <div className="relative flex input-card items-center">
            <FormInput
              placeholder="Please enter your full name.."
              type={"text"}
              id={"register_fullName"}
            />

            <span className="absolute left-2 top-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="auth-input-card">
          <label for="register_username" className="font-Poppins-Medium">
            Username
          </label>
          <div className="relative flex input-card items-center">
            <FormInput
              placeholder="Please enter your username.."
              type={"text"}
              id={"register_username"}
            />

            <span className="absolute left-2 top-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="auth-input-card">
          <label for="register_email" className="font-Poppins-Medium">
            Email address
          </label>
          <div className="relative flex input-card items-center">
            <FormInput
              placeholder="Please enter your email.."
              type={"email"}
              id={"register_email"}
            />
            <span className="absolute left-2 top-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="auth-input-card">
          <label for="register_password" className="font-Poppins-Medium">
            Password
          </label>
          <div className="relative flex input-card items-center">
            <FormInput
              placeholder="Please enter the your password.."
              type={"password"}
              id={"register_password"}
            />
            <span className="absolute left-2 top-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                />
              </svg>
            </span>
          </div>
        </div>
      </main>
      <footer className="mt-4">
        <button
          type="submit"
          className="bg-indigo-700 text-white rounded-sm w-[70%] h-10 cursor-pointer active:bg-indigo-500 "
        >
          Continue
        </button>
      </footer>
    </form>
  );
};

export default RegisterForm;
