const FormInput = ({ placeholder, type, id }) => {
  return (
    <>
      <input
        id={id}
        type={type}
        className=" bg-[#00000012] h-[40px] w-[70%] text-[15px] rounded-[6px] pr-[24px] pl-[42px] mt-[8px] mb-4 placeholder:font-Poppins-SemiBold placeholder:text-[13px] outline-0 "
        placeholder={placeholder}
        required
      />
    </>
  );
};
export default FormInput;
