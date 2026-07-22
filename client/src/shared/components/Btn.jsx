const colorClasses = {
  red: "bg-red-600 hover:bg-red-500/80 active:bg-red-700",
  blue: "bg-blue-600 hover:bg-blue-500/80 active:bg-blue-700",
  green: "bg-green-600 hover:bg-green-500/80 active:bg-green-700",
  gray: "bg-gray-600 hover:bg-gray-500/80 active:bg-gray-700",
  indigo: "bg-indigo-600 hover:bg-indigo-500/80 active:bg-indigo-700",
  purple: "bg-purple-600 hover:bg-purple-500/80 active:bg-purple-700",
};

const Btn = ({ onClick, disabled, value, color, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-Poppins-Medium ml-4 rounded-lg px-4 py-3 text-white ${disabled ? "cursor-not-allowed bg-gray-400" : `${colorClasses[color]} cursor-pointer`} ${className}`}
    >
      {value}
    </button>
  );
};
export default Btn;
