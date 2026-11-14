const CustomInput = ({
  value,
  handleChange,
  type = "text",
  name,
  label,
  placeholder = "",
  className = "",
  autoComplete = "new-password"
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={name}
        className="font-Poppins-SemiBold"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          value={value}
          className="h-12 outline-purple-200 w-full min-w-40 border bg-white border-neutral-300 rounded-xl p-3.5"
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
};
export default CustomInput;