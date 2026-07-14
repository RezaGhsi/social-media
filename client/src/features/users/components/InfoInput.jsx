import { useState } from "react";

const InfoInput = ({
  value,
  handleChange,
  type,
  name,
  label,
  placeholder = "",
}) => {
  return (
    <div className="w-[40%] mr-4">
      <label
        htmlFor={name}
        className="text-sm text-indigo-900 font-Poppins-SemiBold"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          value={value}
          className="w-full min-w-40 h-10 outline-0 border-2 border-indigo-100 rounded-sm pl-4"
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
export default InfoInput;
