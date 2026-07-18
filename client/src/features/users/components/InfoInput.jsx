const InfoInput = ({
  value,
  handleChange,
  type,
  name,
  label,
  placeholder = "",
}) => {
  return (
    <div className="mr-4 w-[40%]">
      <label
        htmlFor={name}
        className="font-Poppins-SemiBold text-sm text-indigo-900"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          value={value}
          className="h-10 w-full min-w-40 rounded-sm border-2 border-indigo-100 pl-4"
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete="new-password"
        />
      </div>
    </div>
  );
};
export default InfoInput;
