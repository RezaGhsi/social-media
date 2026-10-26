const MessageCard = () => {
  return (
    <article className="rounded-lg transition-colors hover:bg-[#f1f1f1]">
      <a href="" className="mb-1 flex items-center gap-3 p-2">
        <div className="w-12 cursor-pointer overflow-hidden rounded-full">
          <img
            src="/public/images/profile-10.jpg"
            className="object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">
            <strong> Miranda </strong>
          </p>
          <p className="text-xs text-neutral-400">Lol, Really? 😂</p>
          {/* <p className="text-xs">+2 new messages</p> */}
          {/* <p className="text-xs">hi how you doing</p> */}
        </div>
      </a>
    </article>
  );
};
export default MessageCard;
