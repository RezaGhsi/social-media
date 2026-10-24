const StoryCard = ({ storyUrl, avatarUrl, name }) => {
  return (
    <div>
      <article className="relative overflow-hidden rounded-lg">
        <div className="relative h-full w-full">
          <img
            src={storyUrl}
            alt="story image"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-10 cursor-pointer rounded-lg bg-linear-to-t from-black/75 via-black/25 to-transparent transition-all"></div>
        </div>

        <div className="absolute top-0 left-0 flex h-full w-full flex-col justify-between p-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border-3 border-purple-900">
            <img src={avatarUrl} className="object-cover" alt="" />
          </div>

          <div className="z-20 cursor-pointer text-sm text-white">{name}</div>
        </div>
        <div className="gradient-bg"></div>
      </article>
    </div>
  );
};
export default StoryCard;
