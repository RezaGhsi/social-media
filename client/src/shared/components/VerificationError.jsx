const VerificationError = ({ className = "" }) => {
  return (
    <div
      className={`p-3 px-4 mt-3 mb-8 bg-red-500/15 flex transition-all justify-between items-center rounded-lg ${className}`}
    >
      <span className="font-Poppins-SemiBold text-xl text-red-700">
        You need to verify your account
      </span>
      <div>
        <button
          id="send-verification-request"
          className="send-verification bg-red-600 text-white px-4 py-3 rounded-lg cursor-pointer active:bg-red-400 "
        >
          Send verification
        </button>
      </div>
    </div>
  );
};
export default VerificationError;
