const RequestCard = ({ username, name, avatarUrl }) => {
  return (
    <article className="rounded-lg bg-white p-3">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <img src={avatarUrl} className="h-full w-full object-cover" alt="" />
        </div>
        <div className="flex flex-col gap-0.5 *:cursor-pointer">
          <a className="font-Poppins-SemiBold text-sm">{name}</a>
          <a className="text-xs text-gray-500">@{username}</a>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm *:cursor-pointer">
        <button className="rounded-sm bg-purple-700 p-2 px-4 text-white transition-colors hover:bg-purple-600">
          Accept
        </button>
        <button className="hover:text-purple-950">Decline</button>
      </div>
    </article>
  );
};
export default RequestCard;
