import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const PasswordInput = ({
  value,
  handleChange,
  name,
  label,
  placeholder = "",
  className = "",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className={`mr-4 w-[40%] ${className}`}>
      <label
        htmlFor={name}
        className="font-Poppins-SemiBold text-sm text-indigo-900"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={name}
          name={name}
          value={value}
          type={isPasswordVisible ? "text" : "password"}
          className="h-10 w-full min-w-40 rounded-sm border-2 border-indigo-100 pr-10 pl-4"
          placeholder={placeholder}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute top-0 right-3 bottom-0 cursor-pointer py-0 text-lg text-neutral-500 outline-0 hover:text-neutral-600"
          onClick={handlePasswordVisibility}
        >
          {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
    </div>
  );
};
export default PasswordInput;
