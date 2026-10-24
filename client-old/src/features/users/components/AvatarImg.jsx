const AvatarImg = ({ avatarUrl }) => {
  const baseURL = import.meta.env.VITE_STATIC_BASE_URL;
  return (
    <>
      <img
        src={`${baseURL}/${avatarUrl || "images/default-profile-pic.png"}`}
        alt="Profile pic"
        className="h-full w-full object-cover"
      />
    </>
  );
};
export default AvatarImg;
