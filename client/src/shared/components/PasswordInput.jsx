import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

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
    <div className={`w-full ${className}`}>
      <label
        htmlFor={name}
        className="font-Poppins-SemiBold "
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={name}
          name={name}
          value={value}
          type={isPasswordVisible ? "text" : "password"}
          className="h-12 outline-purple-200 w-full min-w-40 border bg-white border-neutral-300 rounded-2xl p-3.5"
          placeholder={placeholder}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute top-0 right-3 bottom-0 cursor-pointer py-0 text-lg text-neutral-500 outline-0 hover:text-neutral-600"
          onClick={handlePasswordVisibility}
        >
          {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};
export default PasswordInput;