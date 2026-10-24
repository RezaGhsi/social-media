const PopularPostCard = ({ mediaUrl, description, createdAt }) => {
  return (
    <article className="flex gap-3 px-2">
      <div className="h-18 w-18 overflow-hidden rounded-md">
        <img src={mediaUrl} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="mt-3 flex flex-col justify-between">
        <p className="font-Poppins-SemiBold mb-1 line-clamp-2 w-70 text-xs text-gray-900">
          {description}
        </p>
        <div className="text-xs text-gray-600">
          <p>28 March 2024</p>
        </div>
      </div>
    </article>
  );
};
export default PopularPostCard;
