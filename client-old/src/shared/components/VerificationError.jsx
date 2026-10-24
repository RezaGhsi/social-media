const VerificationError = ({ className = "" }) => {
  return (
    <div
      className={`mt-3 mb-8 flex items-center justify-between rounded-lg bg-red-500/15 p-3 px-4 transition-all ${className}`}
    >
      <span className="font-Poppins-SemiBold text-xl text-red-700">
        You need to verify your account
      </span>
      <div>
        <button
          id="send-verification-request"
          className="send-verification cursor-pointer rounded-lg bg-red-600 px-4 py-3 text-white active:bg-red-400"
        >
          Send verification
        </button>
      </div>
    </div>
  );
};
export default VerificationError;
